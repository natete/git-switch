<?php
/**
 * @file
 * Contains \Drupal\simple_git\BusinessLogic\SimpleGitAccountBusinessLogic
 */
namespace Drupal\simple_git\BusinessLogic;

use \Drupal\simple_git\Service;

abstract class SimpleGitAccountBusinessLogic {

  /**
   * @param $account_id
   * @return array
   */
  static function getAccountByAccountId($account_id) {

    // get user_data, variable "accounts"
    $accounts = array();
    $accounts = $data = Drupal::service('user.data')
      ->get(MODULE_SIMPLEGIT, NULL, 'accounts');

    $result = array();

    // we have to check if there is an account with the given $account['account_id'] for this $account_id
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