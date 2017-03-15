<?php

/**
 * Interface SimpleGitConnectorInterface
 * @file
 * Contains \Drupal\simple_git\Service\SimpleGitConnectorInterface.php
 */

namespace Drupal\simple_git\Service;

interface SimpleGitConnectorInterface {

  public function authorize($params);

  public function getRepositoriesList($params);

  public function getRepository($params);

  public function getPullRequestsList($params);

  public function getPullRequest($params);

  public function getAccount($params);

}