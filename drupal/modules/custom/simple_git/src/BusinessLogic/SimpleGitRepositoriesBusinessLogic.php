<?php
namespace Drupal\simple_git\BusinessLogic;
use \Drupal\simple_git\Service;
class SimpleGitRepositoriesBusinessLogic {

  function getRepositories($account_id) {
    $repositories = array();
    $account = SimpleGitAccountBusinessLogic::getAccountByAccountId($account_id);
    if (!empty($account)) {
      $param['userInfo'] = $account;
      $git_service = Service\SimpleGitConnectorFactory::getConnector($account['type']);
      $repositories=$git_service->getRepositoriesList($param);
    }
    return $repositories;
  }

  function getRepository($account_id, $repo) {
    $repository = array();
    $account = SimpleGitAccountBusinessLogic::getAccountByAccountId($account_id);
    if (!empty($account)) {
      $param['userInfo'] = $account;
      $param['repo']=$repo;
      $git_service = Service\SimpleGitConnectorFactory::getConnector($account['type']);
      $repository=$git_service->getRepositoriesList($param);
    }
    return $repository;
  }

}