<?php
/**
 * @file
 * Contains \Drupal\simple_git\Service\SimpleGitConnectorService.
 */

namespace Drupal\simple_git\Service;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\simple_git\Service\SimpleGitConnectorInterface;
use Drupal\user\UserDataInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Utility\Error;
class SimpleGitConnectorService implements SimpleGitConnectorInterface {
// AVANGELIO: https://gist.github.com/aaronpk/3612742
  protected $response;
  protected $response_status;
  protected $access_token;
  public function authorize($params) {
    if ($params['code'] && $params['state']) {
      $code = $params['code'];
      $state = $params['state'];
      $config = \Drupal::config('simple_github.settings');
//Url to attack
      $url = "https://github.com/login/oauth/access_token";
//Set parameters
      $parameters = array(
        "client_id" => self::CLIENT_ID,
        "client_secret" => self::CLIENT_SECRET,
        "code" => $code,
        "redirect_uri" => "",
        "state" => $state
      );
//Open curl stream
      $ch = $this->getConfiguredCURL($url);
//set the url, number of POST vars, POSTdata
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, count($parameters));
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameters));
      $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);   //get status code
      $response = curl_exec($ch);
//Close curl stream
      curl_close($ch);
//Exposing the access token if it's necessary
      $this->access_token = $response['access_token'];
      $this->token_type = $response['token_type'];
//    error_log('>>>'.print_r(json_decode($this->access_token), true));
//Return the obtained token3
      return $this->access_token;
    }else{
      _drupal_exception_handler('hasta luego maricarmen');
    }
  }
  public function getRepositoriesList($params) {
    if ($params['userInfo']) {
      $user = $params['userInfo'];
      $url = "https://api.github.com/user/repos";
      $ch = $this->getConfiguredCURL($url, $user);
      $repos = curl_exec($ch);
      curl_close($ch);
      $response = array();
      foreach($repos as $repo){
        array_push($response,$this->configureRepositoryFields($repo));
      }
      return $response;
    }
  }
  public function getRepository($params) {
    if ($params['userInfo'] && $params['name']) {
      $user = $params['userInfo'];
      $name = $params['name'];
      $url = "https://api.github.com/" . $user->username . "/" . $name;
      $ch = $this->getConfiguredCURL($url, $user);
      $repo = curl_exec($ch);
      curl_close($ch);
      $response = $this->configureRepositoryFields($repo);
      return $response;
    }
  }
  public function getPullRequestsList($params) {
    if ($params['userInfo'] && $params['repo']) {
      $user = $params['userInfo'];
      $repo = $params['repo'];
      $url = "https://api.github.com/repos/" . $user->username . "/" . $repo . "/pulls";
      $ch = $this->getConfiguredCURL($url, $user);
      $prs = curl_exec($ch);
      curl_close($ch);
      $response = array();
      foreach($prs as $pr){
        array_push($response,$this->configureRepositoryFields($pr));
      }
      return $response;
    }
  }
  public function getPullRequest($params) {
    if ($params['userInfo'] && $params['repo'] && $params['id']) {
      $user = $params['userInfo'];
      $repo = $params['repo'];
      $id = $params['id'];
      $url = "https://api.github.com/repos/" . $user->username . "/" . $repo . "/pulls/" . $id;
      $ch = $this->getConfiguredCURL($url, $user);
      $pr = curl_exec($ch);
      curl_close($ch);
      $response = $this->configurePullRequestFields($pr);
      return $response;
    }
  }
  protected function getUserDetail($params) { //Non-logged user
    if ($params['userInfo']) {
      $user = $params['userInfo'];
      $url = "https://api.github.com/users/" . $user->username;
      $ch = $this->getConfiguredCURL($url, $user);
      $response = curl_exec($ch);
      curl_close($ch);
      return $response;
    }
  }
  public function getAccount($params) {
    if ($params['userInfo']) {
      $user = $params['userInfo'];
      $url = "https://api.github.com/user/";
      $ch = $this->getConfiguredCURL($url, $user);
      $account = curl_exec($ch);
      curl_close($ch);
      $response = $this->configureAccountRequestFields($account);
      return $response;
    }
  }
  protected function getPullRequestCommits($user, $repo, $pr_id) {
    $url = "https://api.github.com/repos/" . $user->usermname . "/" . $repo . "/pulls/" . $pr_id . "/commits";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
  }
  protected function getPullRequestComments($user, $repo, $pr_id) {
    $url = "https://api.github.com/repos/" . $user->usermname . "/" . $repo . "/pulls/" . $pr_id . "/comments";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
  }
  protected function getHeaders() {
    $headers[] = 'Accept: application/json';
// if we have the security token
    if (!empty($this->token_type)) {
      $headers[] = 'Bearer ' . $this->access_token;
    }
    return $headers;
  }
  protected function getConfiguredCURL($url, $username = NULL, $token = NULL) {
    $ch = curl_init($url);
//set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $headers = $this->getHeaders();
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    if ($username != NULL) {
      curl_setopt($ch, CURLOPT_USERPWD, "$username:$token");
    }
    return $ch;
  }
  private function configureRepositoryFields($repo) {
    $response = array(
      "repo_name" => $repo['name'],
      "owner_user" => $repo['owner']['login'],
      "issues" => $repo['open_issues_count'],
      "language" => $repo['language'],
      "updated" => $repo['pushed_at'],
      "forked_origin" => $repo['parent'] ? TRUE : FALSE
    );
    return $response;
  }
  private function configurePullRequestFields($pr) {
    $response = array(
      "pr_number" => $pr['number'],
      "pr_name" => $pr['title'],
      "pr_desc" => $pr['body'],
      "username" => $pr['milestone']['creator']['login'],
      "date" => $pr['milestone']['updated_at'],
      "commits" => $pr['commits'],
      "comments" => $pr['comments'],
      "from_branch" => $pr['head']['label'],
      "to_branch" => $pr['base']['label']
    );
    return $response;
  }
  private function configureAccountRequestFields($account) {
    $response = array(
      "name" => $account['name'],
      "user" => $account['login'],
      "photo" => $account['avatar_url'],
      "id" => $account['id'],
      "location" => $account['location'],
      "company" => $account['company'],
      "repos" => $account['total_private_repos'] + $account['public_repos']
    );
    return $response;
  }
}