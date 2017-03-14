<?php

/**
 * Created by PhpStorm.
 * User: craigada
 * Date: 13/03/17
 * Time: 10:05
 */

namespace Drupal\simple_github\BusinessLogic;


class SimpleGitHubRequestsBusinessLogic {

  /**
   * @var \Drupal\simple_github\Service\SimpleGitHubConnectorService
   */
  protected $gitHubService;

  public function __construct() {
    $this->gitHubService = \Drupal::service('simple_github_connector.service');
    //Example of usage json_decode($this->gitHubService->getRepositoriesByUser($this->user))[0]->owner->login
  }

  private function getUser() {
    //Obtain username and token from drupal user
    $user = get_current_user();
    return $user->account;
  }

  public function listAllRepositories() {

    $user = $this->getUser();
    $repos = $this->gitHubService->getRepositoriesByUser($user);
    $response = array();

    foreach ($repos as $repo) {
      array_push($response, $this->configureRepositoryFields($repo));
    }

    return $response;
  }

  public function listAllPullRequest($repo) {

    $user = $this->getUser();
    $prs = $this->gitHubService->getPullRequestList($user, $repo);
    $response = array();

    foreach ($prs as $pr) {
      array_push($response, $this->getPullRequestDetail($pr->id));
    }

    return $response;
  }

  public function getRepositoryDetail($repo_name) {

    $this->getUser();
    $repo = $this->gitHubService->getRepositoryByName($repo_name);
    $response = $this->configureRepositoryFields($repo);

    return $response;
  }

  public function getPullRequestDetail($repo_name, $pr_id) {
    $user = $this->getUser();
    $pr = $this->gitHubService->getPullRequestById($user, $repo_name, $pr_id);
    $response = $this->configurePullRequestFields($pr);

    return $response;
  }

  public function getAccountDetail() {
    $user = $this->getUser();
    $account = $this->gitHubService->getLoggedUser($user);
    $response = $this->configureAccountRequestFields($account);

    return $response;
  }

  private function configureRepositoryFields($repo) {

    $response = array(
      "repo_name" => $repo->name,
      "owner_user" => $repo->owner->login,
      "issues" => $repo->open_issues_count,
      "language" => $repo->language,
      "updated" => $repo->pushed_at,
      "forked_origin" => $repo->parent ? TRUE : FALSE
    );

    return $response;
  }

  private function configurePullRequestFields($pr) {

    $response = array(
      "pr_number" => $pr->number,
      "pr_name" => $pr->title,
      "pr_desc" => $pr->body,
      "username" => $pr->milestone->creator->login,
      "date" => $pr->milestone->updated_at,
      "commits" => $pr->commits,
      "comments" => $pr->comments,
      "from_branch" => $pr->head->label,
      "to_branch" => $pr->base->label
    );

    return $response;
  }

  private function configureAccountRequestFields($account) {
    $response = array(
      "name" => $account->name,
      "user" => $account->login,
      "photo" => $account->avatar_url,
      "id" => $account->id,
      "location" => $account->location,
      "company" => $account->company,
      "repos" => $account->total_private_repos + $account->public_repos
    );

    return $response;
  }
}