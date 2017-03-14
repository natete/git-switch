<?php

/**
 * Interface SimpleGitConnectorInterface
 * @file
 * Contains \Drupal\simple_git\Service\SimpleGitConnectorInterface.php
 */

namespace Drupal\simple_git\Service;

interface SimpleGitConnectorInterface {
  const CLIENT_ID = 'cf0f72380b77a0ae16e9';
  const CLIENT_SECRET = 'c6962314dc7945e8f2f09888d6ee61c352e867c8';

  public function authorize($params);

  public function getRepositoriesList($params);

  public function getRepository($params);

  public function getPullRequestsList($params);

  public function getPullRequest($params);

  public function getAccount($params);

}