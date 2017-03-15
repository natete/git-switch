<?php

use \Drupal\simple_git\Service;
class SimpleGitRepositoriesBusinessLogic {

  function getRepositories($account_id) {
    $account = SimpleGitAccountBusinessLogic::getAccountByAccountId($account_id);
    if (!empty($account)) {

    }
  }

}