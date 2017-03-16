<?php
/**
 * @file
 * Contains \Drupal\simple_git\BusinessLogic\SimpleGitDataBaseBusinnesLogic
 */
abstract class SimpleGitDataBaseBusinnesLogic {

  static final function getAccounts($user) {
    return Drupal::service('user.data')
      ->get(MODULE_SIMPLEGIT, $user->id(), 'accounts');
  }

  static final function setAccounts($user, $accounts) {
    return Drupal::service('user.data')
      ->set(MODULE_SIMPLEGIT, $user->id(), 'accounts', $accounts);;
  }

}