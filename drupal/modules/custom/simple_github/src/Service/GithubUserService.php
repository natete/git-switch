<?php
/**
 * @file
 * Contains \Drupal\simple_github\Service\GithubUserService.php
 */

namespace Drupal\simple_github\Service;


use Drupal\simple_github\Model\GithubUser;

class GithubUserService {


  protected $module = 'simple_github';

  /**
   * The user data service.
   *
   * @var \Drupal\user\UserData
   */
  protected $user_data;


  /**
   * @param $account
   * @return If $uid was passed, return the uid/value pairs
   */
  public function getGithubAccounts(UserInterface $user) {
    $data = Drupal::service('user.data')->get($this->module, $user->id(), 'accounts');
    return $data;
  }

  /**
   * Set a value.
   * @param $uid
   * @param $token
   */
  public function setGithub(UserInterface $user, $token) {
    $data = getGithub($user);
    $userGit = new GithubUser();
    $value = array(
      'idgithub' => $userGit->getIdGithub(),
      'user' => $userGit->getUsername(),
      'token' => $userGit->setToken($token)

    );
    \Drupal::service('user.data')
      ->set($this->module, $user->id(), $user->name(), $value);

  }


}