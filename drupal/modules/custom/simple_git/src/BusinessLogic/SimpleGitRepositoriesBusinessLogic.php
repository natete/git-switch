<?php
namespace Drupal\simple_git\BusinessLogic;
use \Drupal\simple_git\Service;
class SimpleGitRepositoriesBusinessLogic {
  /**
   * @param $account_id
   * @return array|mixed
   */
  function getRepositories($account_id) {
    $repositories = array();
    $account = SimpleGitAccountBusinessLogic::getAccountByAccountId($account_id);
    if (!empty($account)) {
      $params['userInfo'] = $account;
      $git_service = Service\SimpleGitConnectorFactory::getConnector($account['type']);
      $repositories=$git_service->getRepositoriesList($params);
    }
    return $repositories;
  }


  /**
   * @param $account_id
   * @param $repo
   * @return array|mixed
   */
  function getRepository($account_id, $repo) {
    $repository = array();
    $account = SimpleGitAccountBusinessLogic::getAccountByAccountId($account_id);
    if (!empty($account)) {
      $params['userInfo'] = $account;
      $params['repo']=$repo;
      $git_service = Service\SimpleGitConnectorFactory::getConnector($account['type']);
      $repository=$git_service->getRepositoriesList($params);
    }
    return $repository;
  }

}