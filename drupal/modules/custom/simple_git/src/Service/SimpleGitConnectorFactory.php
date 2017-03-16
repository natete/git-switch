<?php

/**
 * @file
 * Contains \Drupal\simple_git\Service\SimpleGitConnectorFactory.php
 */

namespace Drupal\simple_git\Service;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\simple_git\Service\SimpleGitConnectorInterface;
use Drupal\user\UserDataInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Connector Simple Factory.
 */
abstract class SimpleGitConnectorFactory {

  /**
   * It retrieves a \Drupal\simple_git\Service\SimpleGitConnectorService instance.
   *
   * @param $type
   *  Depending on the type, the factory will return a different instance of \Drupal\simple_git\Service\SimpleGitConnectorService.
   * @return \Drupal\simple_git\Service\SimpleGitConnector
   *  Instance that matches with the given $type.
   */
  static function getConnector($type) {
    $connector = null;

    switch ($type) {
      case GIT_TYPE_GITHUB:
        $connector = \Drupal::service('simple_git.github_connector.service');
        break;
      default:
        $connector = \Drupal::service('simple_git.github_connector.service');
    }
    return $connector;
  }
}