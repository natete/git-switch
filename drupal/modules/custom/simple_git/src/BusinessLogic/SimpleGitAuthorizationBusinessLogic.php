<?php

use \Drupal\simple_git\Service;

abstract class SimpleGitAuthorizationBusinessLogic extends SimpleGitDataBaseBusinnesLogic {

  /**
   * @param $user
   * @param $params
   * @return array|mixed
   */
  static function authorize($user, $params) {

    $git_service = Service\SimpleGitConnectorFactory::getConnector($params['type']);

    $auth_info = $git_service->authorize($params);

    $result = array();

    // 'access_token'
    if (!empty($auth_info)) {
      $git_account = $git_service->getAccount($auth_info);
      if (isset($git_account['user'])) {
        //
        $account_info = self::addOrUpdateAccount($user, $git_account, $git_service->getConnectorType());

        $result = $git_account;
        $result['account_id'] = $account_info['account_id'];
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
  static protected function addOrUpdateAccount($user, $git_account, $connector_type) {
    // get user_data, variable "accounts"
    $accounts = SimpleGitDataBaseBusinnesLogic::getAccounts($user);

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
    SimpleGitDataBaseBusinnesLogic::setAccounts($user,$accounts);

    return $result;
  }

  /**
   * @param $accounts
   * @param $git_account
   * @param $connector_type
   * @return array
   */
  static protected function createAccount($accounts, $git_account, $connector_type) {
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

}