<?php

/**
 * @file
 * Contains \Drupal\simple_git\BusinessLogic\SimpleGitDataBaseBusinnesLogic
 */
abstract class SimpleGitDataBaseBusinnesLogic {

  /**
   * @param $user
   * @return mixed
   */
  static final function getAccounts($user) {
    return Drupal::service('user.data')
      ->get(MODULE_SIMPLEGIT, $user->id(), 'accounts');
  }

  /**
   * @param $user
   * @param $accounts
   * @return mixed
   */
  static final function setAccounts($user, $accounts) {
    return Drupal::service('user.data')
      ->set(MODULE_SIMPLEGIT, $user->id(), 'accounts', $accounts);;
  }

}