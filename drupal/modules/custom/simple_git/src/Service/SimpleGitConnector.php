<?php

/**
 * Interface SimpleGitConnectorInterface
 * @file
 * Contains \Drupal\simple_git\Service\SimpleGitConnectorInterface.php
 */

namespace Drupal\simple_git\Service;

abstract class SimpleGitConnector {

  protected $mappings = array();

  const PULL_REQUEST = 'PULL_REQUEST';
  const ACCOUNT = 'ACCOUNT';
  const REPOSITORY = 'REPOSITORY';

  public function __construct() {
    $this->buildCustomMappings();
  }

  protected final function getConnectorConfig() {
    $git_settings =  \Drupal::config('simple_git.settings');
    return $git_settings->get($this->getConnectorType());
  }

  protected abstract function buildCustomMappings();

  public abstract function authorize($params);

  public abstract function getRepositoriesList($params);

  public abstract function getRepository($params);

  public abstract function getPullRequestsList($params);

  public abstract function getPullRequest($params);

  public abstract function getAccount($params);

  public abstract function getConnectorType();

  // $this->buildResponse($data, 'PR');
  protected final function buildResponse($data, $type) {
    $response = array();

    if (isset($this->mappings[$type]) && is_array($this->mappings[$type])) {
      foreach($this->mappings[$type] as $responseKey => $connectorKey) {
        // we check if it is a multinode element
        if (strpos($connectorKey, '->')) {
          $node_names = explode('->', $connectorKey);

          $finalValue = $data[$node_names[0]]; // $data['milestone']
          for ($i = 1; $i < sizeof($node_names); $i++) {
            $finalValue = $finalValue[$node_names[$i]];
          }

          $response[$responseKey] = $finalValue;
        } else {
          $response[$responseKey] = $data[$connectorKey];
        }
      }
    }
    return $response;
  }

}