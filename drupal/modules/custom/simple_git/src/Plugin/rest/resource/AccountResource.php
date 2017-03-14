<?php

/**
 * @file
 * Contains \Drupal\simple_git\Plugin\rest\resource\AccountResource.php
 */

namespace Drupal\simple_git\Plugin\rest\resource;

use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Provides a Connector Resource
 *
 * @RestResource(
 *   id = "simple_git_account_resource",
 *   label = @Translation("Git Account Resource"),
 *   uri_paths = {
 *     "canonical" = "/simple_git_api/account"
 *   }
 * )
 */
class AccountResource extends ResourceBase {

  /**
   *  A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $current_user;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('current_user')
    );
  }

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\ $logger
   *   A logger instance.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, $logger, AccountProxyInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->current_user = $current_user;
  }

  /*
   * Responds to POST requests.
   *
   * It connects with the Git Service given using the given information, returning the account data.
   *
   * @param array $data
   *  Request data.
   *
   * @return \Drupal\rest\ResourceResponse
   *   The response containing the Git account data.
   */
  public function post($data) {
    // TODO: Link to github and validate $data information
    $user_data = array(
      'id' => 3,
      'fullname' => 'Alejandro Gómez Morón',
      'username' => 'agomezmoron',
      'email' => 'agommor@gmail.com',
      'photoUrl' => 'http://lorempixel.com/200/200/',
      'repoNumber' => 10,
      'organization' => 'Emergya',
      'location' => 'Sevilla',
    );

    return new ResourceResponse($user_data);
  }

  /*
   * Responds to DELETE requests.
   *
   * It deletes the sent account.
   *
   * @param array $data
   *  Request data.
   *
   * @return \Drupal\rest\ResourceResponse
   *   The response with the result status.
   */
  public function delete($data) {
    // TODO: Link to github and validate $data information
    $response_data = array(
      'message' => _('Account removed successfully')
    );

    return new ResourceResponse($response_data);
  }

  /*
  * Responds to the GET request.
  *
  * @return \Drupal\rest\ResourceResponse
  *   The response containing all the linked accounts
  */
  public function get() {
    $accounts = array();

    $accounts[] = array(
      'id' => 1,
      'fullname' => 'Alejandro Gómez Morón',
      'username' => 'agomezmoron',
      'email' => 'agommor@gmail.com',
      'type' => 'GITHUB',
      'photoUrl' => 'http://lorempixel.com/200/200/',
      'repoNumber' => 10,
      'organization' => 'Emergya',
      'location' => 'Sevilla',
    );

    $accounts[] = array(
      'id' => 3,
      'fullname' => 'Alejandro Gómez Morón',
      'username' => 'agomezmoron',
      'email' => 'agommor@gmail.com',
      'type' => 'BITBUCKET',
      'photoUrl' => 'http://lorempixel.com/200/200/',
      'repoNumber' => 10,
      'organization' => 'Emergya',
      'location' => 'Sevilla',
    );


    return new ResourceResponse($accounts);
  }

}