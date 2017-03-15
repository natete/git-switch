<?php

/**
 * Created by PhpStorm.
 * User: ebarrera
 * Date: 15/03/17
 * Time: 14:38
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