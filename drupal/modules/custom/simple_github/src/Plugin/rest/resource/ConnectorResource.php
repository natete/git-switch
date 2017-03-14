<?php

/**
 * @file
 * Contains \Drupal\simple_github\Plugin\rest\resource\ConnectorResource.php
 */

namespace Drupal\simple_github\Plugin\rest\resource;

use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a Connector Resource
 *
 * @RestResource(
 *   id = "simple_github_connector_resource",
 *   label = @Translation("GitHub Connector Resource"),
 *   uri_paths = {
 *     "canonical" = "/simple_github_api/connector"
 *   }
 * )
 */
class ConnectorResource extends ResourceBase {

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
   * Responds to the GET request.
   *
   * @return \Drupal\rest\ResourceResponse
   *   The response containing all the Pull Requests available.
   */
  public function get() {
    $pull_requests = array();

    $pull_requests[] = array(
      'title' =>  'Pull Request 1 Title',
      'description' => 'Pull Request description gfjdngfkjdnbjdkjnfvjdn',
      'userName' => 'UserName1',
      'date' => '10 months',
      'commits' => 312,
      'comment' => 129,
      'count' => 582,
      'from' => 'MB-1685-DEV_Fix',
      'to' => 'Master_branch_of_project',
    );

    $pull_requests[] = array(
      'title' =>  'Pull Request 2 Title',
      'description' => 'Pull Request description gfjdngfkjdnbjdkjnfvjdn',
      'userName' => 'UserName2',
      'date' => '13 months',
      'commits' => 312,
      'comment' => 129,
      'count' => 582,
      'from' => 'MBs-1685-DEV_Fix',
      'to' => 'Master_branch_of_project',
    );

    return new ResourceResponse($pull_requests);
  }

}