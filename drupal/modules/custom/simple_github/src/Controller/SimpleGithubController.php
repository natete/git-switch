<?php

/**
 * @file
 * Contains \Drupal\simple_github\Controller\SimpleGithubController.
 */

namespace Drupal\simple_github\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\user\UserDataInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Controller routines for oauth routes.
 */
class SimpleGithubController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * The URL generator service.
   *
   * @var \Drupal\Core\Utility\LinkGeneratorInterface
   */
  protected $linkGenerator;

  /**
   * The user data service.
   *
   * @var \Drupal\user\UserData
   */
  protected $user_data;

  /**
   * Constructs an OauthController object.
   *
   * @param \Drupal\user\UserDataInterface $user_data
   *   The user data service.
   *
   * @param \Drupal\Core\Utility\LinkGeneratorInterface $link_generator
   *   The link generator service.
   */
  public function __construct(UserDataInterface $user_data, LinkGeneratorInterface $link_generator) {
    $this->user_data = $user_data;
    $this->linkGenerator = $link_generator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    /** @var \Drupal\user\UserDataInterface $user_data */
    $user_data = $container->get('user.data');

    /** @var \Drupal\Core\Utility\LinkGeneratorInterface $link_generator */
    $link_generator = $container->get('link_generator');

    return new static($user_data, $link_generator);
  }


}
