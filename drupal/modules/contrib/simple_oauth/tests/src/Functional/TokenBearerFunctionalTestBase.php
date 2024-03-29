<?php


namespace Drupal\Tests\simple_oauth\Functional;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Url;
use Drupal\simple_oauth\Entity\Oauth2Client;
use Drupal\Tests\BrowserTestBase;
use Drupal\user\Entity\Role;
use Drupal\user\RoleInterface;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Psr\Http\Message\ResponseInterface;

abstract class TokenBearerFunctionalTestBase extends BrowserTestBase {

  /**
   * @var \Drupal\Core\Url
   */
  protected $url;

  /**
   * @var \Drupal\simple_oauth\Entity\Oauth2ClientInterface
   */
  protected $client;

  /**
   * @var \Drupal\user\UserInterface
   */
  protected $user;

  /**
   * @var string
   */
  protected $clientSecret;

  /**
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * @var \Drupal\user\RoleInterface[]
   */
  protected $additionalRoles;

  /**
   * @var string
   */
  protected $privateKeyPath;

  /**
   * @var string
   */
  protected $publicKeyPath;

  /**
   * @var string
   */
  protected $scope;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $this->htmlOutputEnabled = FALSE;

    $this->url = Url::fromRoute('oauth2_token.token');

    // Set up a HTTP client that accepts relative URLs.
    $this->httpClient = $this->container->get('http_client_factory')
      ->fromOptions(['base_uri' => $this->baseUrl]);

    $client_role = Role::create([
      'id' => $this->getRandomGenerator()->name(8, TRUE),
      'label' => $this->getRandomGenerator()->word(5),
      'is_admin' => FALSE,
    ]);
    $client_role->save();

    $this->additionalRoles = [];
    for ($i = 0; $i < mt_rand(1, 3); $i++) {
      $role = Role::create([
        'id' => $this->getRandomGenerator()->name(8, TRUE),
        'label' => $this->getRandomGenerator()->word(5),
        'is_admin' => FALSE,
      ]);
      $role->save();
      $this->additionalRoles[] = $role;
    }

    $this->clientSecret = $this->getRandomGenerator()->string();

    $this->client = Oauth2Client::create([
      'owner_id' => '',
      'label' => $this->getRandomGenerator()->name(),
      'description' => $this->getRandomGenerator()->paragraphs(),
      'secret' => $this->clientSecret,
      'confidential' => TRUE,
      'roles' => [['target_id' => $client_role->id()]],
    ]);
    $this->client->save();

    $this->user = $this->drupalCreateUser();
    $this->grantPermissions(Role::load(RoleInterface::ANONYMOUS_ID), [
      'access content',
    ]);
    $this->grantPermissions(Role::load(RoleInterface::AUTHENTICATED_ID), [
      'access content',
    ]);

    // Use the public and private keys.
    $path = $this->container->get('module_handler')->getModule('simple_oauth')->getPath();
    $this->publicKeyPath = DRUPAL_ROOT . '/' . $path . '/tests/certificates/public.key';
    $this->privateKeyPath = DRUPAL_ROOT . '/' . $path . '/tests/certificates/private.key';
    $settings = $this->config('simple_oauth.settings');
    $settings->set('public_key', $this->publicKeyPath);
    $settings->set('private_key', $this->privateKeyPath);
    $settings->save();

    $num_roles = mt_rand(1, count($this->additionalRoles));
    $requested_roles = array_slice($this->additionalRoles, 0, $num_roles);
    $scopes = array_map(function (RoleInterface $role) {
      return $role->id();
    }, $requested_roles);
    $this->scope = implode(' ', $scopes);

    drupal_flush_all_caches();
  }

  /**
   * Performs a HTTP request. Wraps the Guzzle HTTP client.
   *
   * Why wrap the Guzzle HTTP client? Because any error response is returned via
   * an exception, which would make the tests unnecessarily complex to read.
   *
   * @see \GuzzleHttp\ClientInterface::request()
   *
   * @param string $method
   *   HTTP method.
   * @param \Drupal\Core\Url $url
   *   URL to request.
   * @param array $request_options
   *   Request options to apply.
   *
   * @return \Psr\Http\Message\ResponseInterface
   */
  protected function request($method, Url $url, array $request_options) {
    try {
      $response = $this->httpClient->request($method, $url->toString(), $request_options);
    }
    catch (ClientException $e) {
      $response = $e->getResponse();
    }
    catch (ServerException $e) {
      $response = $e->getResponse();
    }

    return $response;
  }

  /**
   * Validates a valid token response.
   *
   * @param \Psr\Http\Message\ResponseInterface $response
   *   The response object.
   *
   * @param bool $has_refresh
   *   TRUE if the response should return a refresh token. FALSE otherwise.
   */
  protected function assertValidTokenResponse(ResponseInterface $response, $has_refresh = FALSE) {
    $this->assertEquals(200, $response->getStatusCode());
    $parsed_response = Json::decode($response->getBody()->getContents());
    $this->assertSame('Bearer', $parsed_response['token_type']);
    $expiration = $this->config('simple_oauth.settings')->get('expiration');
    $this->assertLessThanOrEqual($expiration, $parsed_response['expires_in']);
    $this->assertGreaterThanOrEqual($expiration - 10, $parsed_response['expires_in']);
    $this->assertNotEmpty($parsed_response['access_token']);
    if ($has_refresh) {
      $this->assertNotEmpty($parsed_response['refresh_token']);
    }
    else {
      $this->assertTrue(empty($parsed_response['refresh_token']));
    }
  }

}
