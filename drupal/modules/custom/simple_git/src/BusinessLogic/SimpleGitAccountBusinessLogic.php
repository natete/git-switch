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
  static function getAccountByAccountId($user,$account_id) {

    // get user_data, variable "accounts"
    $accounts = array();
    $accounts = self::getAccounts($user);

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


  /**
   * @param $user
   * @param $git_account
   * @param $connector_type
   * @return array
   */
  static function addOrUpdateAccount($user, $git_account, $connector_type) {
    // get user_data, variable "accounts"
    $accounts = self::getAccounts($user);

    $result = array();

    $found = FALSE;
    // we have to check if there is an account with the given $git_account['name'] for this $connector_type
    foreach ($accounts as &$account) {
      // if it exists, we have to update it
      if ($account['name'] == $git_account['name'] && $account['type'] == $connector_type) {
        $account['access_info'] = $git_account;
        $result = $account;
        $found = TRUE;
        break;
      }
    }

    if (!$found) {
      // we have to create it
      $result = self::createAccount($accounts, $git_account, $connector_type);
      $accounts[] = $result;
    }

    // save user_data
    self::setAccounts($user, $accounts);

    return $result;
  }

  /**
   * @param $accounts
   * @param $git_account
   * @param $connector_type
   * @return array
   */
  static function createAccount($accounts, $git_account, $connector_type) {
    $account = array();

    // getting the maximim account_id
    $max_account_id = max(array_column($accounts, 'account_id'));

    $account = array(
      'account_id' => $max_account_id + 1,
      'type' => $connector_type,
      'name' => $git_account['name'],
      'access_info' => $git_account
    );

    return $account;
  }

  /**
   * @param $user
   * @return mixed
   */
  static function getAccounts($user) {
    return Drupal::service('user.data')
      ->get(MODULE_SIMPLEGIT, $user->id(), 'accounts');
  }

  /**
   * @param $user
   * @param $accounts
   * @return mixed
   */
  static function setAccount($user, $account) {
    $db_accounts = self::getAccounts($user);

    $accounts = self::checkUserData($db_accounts,$account);

    return Drupal::service('user.data')
      ->set(MODULE_SIMPLEGIT, $user->id(), 'accounts', $accounts);
  }

  static function setAccounts($user, $accounts){
    foreach($accounts as $account){
      $last_accounts_list = self::setAccount($user,$account);
    }
    return $last_accounts_list;
  }

  /**
   * @param $db_users
   * @param $new_user
   * @return array
   */
  static function checkUserData($db_users, $new_user) {
    $exist = FALSE;
    foreach ($db_users as $db_user) {
      if ($db_user['username'] == $new_user['username']) {
        $exist = TRUE;
        if (isset($new_user['token']) && !is_null($new_user['token']) && $db_user['token'] != $new_user['token']) {
          $db_user['token'] = $new_user['token'];
        }
      }
    }
    if (!$exist) {
      $db_users[] = $new_user;
    }
    return $db_users;
  }
}