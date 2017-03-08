<?php

/**
 * @file
 * Contains \Drupal\simple_github\Controller\SimpleGitHubController.
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
 * Controller routines for simple_github routes.
 */
class SimpleGitHubController extends ControllerBase implements ContainerInjectionInterface {

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
   * Constructs an SimpleGitHubController object.
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

    /**
     * Returns the list of repositories for a user.
     *
     * @param \Drupal\user\UserInterface $user
     *   A user account object.
     *
     * @return string
     *   A HTML-formatted string with the list of repositories.
     */
    public function repositories(UserInterface $user) {
        $list = array();
/*
        $list['#cache']['tags'] = array(
            'simple_github:' => $user->id(),
        );
*/
        //$list['heading']['#markup'] = $this->linkGenerator->generate($this->t('Add consumer'), Url::fromRoute('oauth.user_consumer_add', array('user' => $user->id())));

        // Get the list of repositories.
        $result = $this->user_data->get('simple_github', $user->id(), 'repositories');

        // Define table headers.
        $list['table'] = array(
            '#theme' => 'table',
            '#header' => array(
                'repo_name' => array(
                    'data' => $this->t('Repository name'),
                ),
                'repo_location' => array(
                    'data' => $this->t('Repository location'),
                ),
                'operations' => array(
                    'data' => $this->t('Operations'),
                ),
            ),
            '#rows' => array(),
        );

        // Add existing repositories to the table.
        foreach ($result as $repository) {
            $list['table']['#rows'][] = array(
                'data' => array(
                    'repo_name' => $repository['repo_name'],
                    'repo_location' => $repository['repo_location'],
                    'operations' => array(
                        'data' => array(
                            '#type' => 'operations',
                            '#links' => array(
                                'delete' => array(
                                    'title' => $this->t('Delete'),
                                    'url' => '#'//Url::fromRoute('oauth.user_consumer_delete', array('user' => $user->id(), 'key' => $key)),
                                ),
                            ),
                        ),
                    ),
                ),
            );
        }


        $list['table']['#empty'] = $this->t('There are no repositories.');

        return $list;
    }

}