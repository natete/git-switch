<?php

use \Drupal\simple_git\Service;
abstract class SimpleGitAccountBusinessLogic {


  static function getAccountByAccountId($account_id) {

    // get user_data, variable "accounts"
    $accounts = array();
    $accounts = $data = Drupal::service('user.data')
      ->get(MODULE_SIMPLEGIT, NULL, 'accounts');

    $result = array();

    // we have to check if there is an account with the given $git_account['name'] for this $connector_type
    foreach ($accounts as &$account) {
      // if it exists, we have to update it
      if ($account['account_id'] == $account_id) {
        $result = $account;
        break;
      }
    }

    return $result;
  }

}