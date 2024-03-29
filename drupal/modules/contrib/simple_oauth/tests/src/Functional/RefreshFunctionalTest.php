<?php

namespace Drupal\Tests\simple_oauth\Functional;

use Drupal\Component\Serialization\Json;
use Drupal\simple_oauth\Entity\Oauth2Token;
use League\OAuth2\Server\CryptKey;
use League\OAuth2\Server\CryptTrait;

/**
 * Class RefreshFunctionalTest
 *
 * @package Drupal\Tests\simple_oauth\Functional
 *
 * @group simple_oauth
 */
class RefreshFunctionalTest extends TokenBearerFunctionalTestBase {

  use CryptTrait;

  public static $modules = [
    'image',
    'node',
    'simple_oauth',
    'serialization',
    'text',
  ];

  /**
   * @var string
   */
  protected $refreshToken;

  /**
   * @var \Drupal\simple_oauth\Entity\Oauth2TokenInterface
   */
  protected $accessTokenEntity;

  /**
   * @var \Drupal\simple_oauth\Entity\Oauth2TokenInterface
   */
  protected $refreshTokenEntity;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $expiration = (new \DateTime())->add(new \DateInterval('P1D'))->format('U');
    $this->accessTokenEntity = Oauth2Token::create([
      'bundle' => 'access_token',
      'auth_user_id' => $this->user->id(),
      'client' => ['target_id' => $this->client->id()],
      'scopes' => explode(' ', $this->scope),
      'value' => base64_encode($this->getRandomGenerator()->string(16)),
      'expire' => $expiration,
      'status' => TRUE,
    ]);
    $this->accessTokenEntity->save();

    $this->refreshTokenEntity = Oauth2Token::create([
      'bundle' => 'refresh_token',
      'auth_user_id' => 0,
      'scopes' => explode(' ', $this->scope),
      'value' => base64_encode($this->getRandomGenerator()->string(16)),
      'expire' => $expiration,
      'status' => TRUE,
    ]);
    $this->refreshTokenEntity->save();

    $refresh_token_plain = json_encode([
      'client_id' => $this->client->uuid(),
      'refresh_token_id' => $this->refreshTokenEntity->get('value')->value,
      'access_token_id' => $this->accessTokenEntity->get('value')->value,
      'scopes' => explode(' ', $this->scope),
      'user_id' => $this->accessTokenEntity->get('auth_user_id')->target_id,
      'expire_time' => $this->refreshTokenEntity->get('expire')->value,
    ]);

    // Encrypt the token.
    $this->setPrivateKey(new CryptKey($this->privateKeyPath));
    $this->setPublicKey(new CryptKey($this->publicKeyPath));
    $this->refreshToken = $this->encrypt($refresh_token_plain);
  }

  /**
   * Test the valid Refresh grant.
   */
  public function testRefreshGrant() {
    // 1. Test the valid response.
    $valid_payload = [
      'grant_type' => 'refresh_token',
      'client_id' => $this->client->uuid(),
      'client_secret' => $this->clientSecret,
      'refresh_token' => $this->refreshToken,
      'scope' => $this->scope,
    ];
    $response = $this->request('POST', $this->url, [
      'form_params' => $valid_payload,
    ]);
    $this->assertValidTokenResponse($response, TRUE);

    // 2. Test the valid without scopes.
    // We need to use the new refresh token, the old one is revoked.
    $response->getBody()->rewind();
    $parsed_response = Json::decode($response->getBody()->getContents());
    $valid_payload = [
      'grant_type' => 'refresh_token',
      'client_id' => $this->client->uuid(),
      'client_secret' => $this->clientSecret,
      'refresh_token' => $parsed_response['refresh_token'],
      'scope' => $this->scope,
    ];
    $response = $this->request('POST', $this->url, [
      'form_params' => $valid_payload,
    ]);
    $this->assertValidTokenResponse($response, TRUE);

    // 3. Test that the token token was revoked.
    $valid_payload = [
      'grant_type' => 'refresh_token',
      'client_id' => $this->client->uuid(),
      'client_secret' => $this->clientSecret,
      'refresh_token' => $this->refreshToken,
      'scope' => $this->scope,
    ];
    $response = $this->request('POST', $this->url, [
      'form_params' => $valid_payload,
    ]);
    $parsed_response = Json::decode($response->getBody()->getContents());
    $this->assertSame(400, $response->getStatusCode());
    $this->assertSame('invalid_request', $parsed_response['error']);
  }

  /**
   * Test invalid Refresh grant.
   */
  public function testMissingRefreshGrant() {
    $valid_payload = [
      'grant_type' => 'refresh_token',
      'client_id' => $this->client->uuid(),
      'client_secret' => $this->clientSecret,
      'refresh_token' => $this->refreshToken,
      'scope' => $this->scope,
    ];

    $data = [
      'grant_type' => [
        'error' => 'invalid_grant',
        'code' => 400,
      ],
      'client_id' => [
        'error' => 'invalid_request',
        'code' => 400,
      ],
      'client_secret' => [
        'error' => 'invalid_client',
        'code' => 401,
      ],
      'refresh_token' => [
        'error' => 'invalid_request',
        'code' => 400,
      ],
    ];
    foreach ($data as $key => $value) {
      $invalid_payload = $valid_payload;
      unset($invalid_payload[$key]);
      $response = $this->request('POST', $this->url, [
        'form_params' => $invalid_payload,
      ]);
      $parsed_response = Json::decode($response->getBody()->getContents());
      $this->assertSame($value['code'], $response->getStatusCode(), sprintf('Correct status code %d for %s.', $value['code'], $key));
      $this->assertSame($value['error'], $parsed_response['error'], sprintf('Correct error code %s for %s.', $value['error'], $key));
    }
  }

  /**
   * Test invalid Refresh grant.
   */
  public function testInvalidRefreshGrant() {
    $valid_payload = [
      'grant_type' => 'refresh_token',
      'client_id' => $this->client->uuid(),
      'client_secret' => $this->clientSecret,
      'refresh_token' => $this->refreshToken,
      'scope' => $this->scope,
    ];

    $data = [
      'grant_type' => [
        'error' => 'invalid_grant',
        'code' => 400,
      ],
      'client_id' => [
        'error' => 'invalid_client',
        'code' => 401,
      ],
      'client_secret' => [
        'error' => 'invalid_client',
        'code' => 401,
      ],
      'refresh_token' => [
        'error' => 'invalid_request',
        'code' => 400,
      ],
    ];
    foreach ($data as $key => $value) {
      $invalid_payload = $valid_payload;
      $invalid_payload[$key] = $this->getRandomGenerator()->string();
      $response = $this->request('POST', $this->url, [
        'form_params' => $invalid_payload,
      ]);
      $parsed_response = Json::decode($response->getBody()->getContents());
      $this->assertSame($value['code'], $response->getStatusCode(), sprintf('Correct status code %d for %s.', $value['code'], $key));
      $this->assertSame($value['error'], $parsed_response['error'], sprintf('Correct error code %s for %s.', $value['error'], $key));
    }
  }

}
