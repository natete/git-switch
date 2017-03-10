<?php

/**
 * @file
 * Contains \Drupal\simple_github\Plugin\rest\resource\AccountsResource.php
 */

namespace Drupal\simple_github\Plugin\rest\resource;

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
 *   id = "simple_github_account_resource",
 *   label = @Translation("GitHub Account Resource"),
 *   uri_paths = {
 *     "canonical" = "/simple_github_api/account"
 *   }
 * )
 */
class AccountResource extends ResourceBase {

  /**
   *  A curent user instance.
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
   * Responds to GET requests.
   *
   * Returns the defined connector.
   *
   * @return \Drupal\rest\ResourceResponse
   *   The response containing a list of connectors.
   */
  public function get() {
    $config = \Drupal::config('simple_github.settings');
    $connectors = array(
      'app_id' => $config->get('app_id'),
      'user' => $this->current_user
    );
    return new ResourceResponse($connectors);
  }

}