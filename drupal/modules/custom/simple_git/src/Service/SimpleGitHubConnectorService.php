<?php
/**
 * @file
 * Contains \Drupal\simple_git\Service\SimpleGitConnectorService.
 */
namespace Drupal\simple_git\Service;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\simple_git\Plugin\rest\resource\PullRequestResource;
use Drupal\simple_git\Service\SimpleGitConnectorInterface;
use Drupal\user\UserDataInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

class SimpleGitHubConnectorService extends SimpleGitConnector {
  protected $response;
  protected $response_status;
  protected $access_token;

  public function __construct() {
    parent::__construct();
  }

  public function authorize($params) {
    if ($params['code'] && $params['state']) {
      $code = $params['code'];
      $state = $params['state'];
      $settings = $this->getConnectorConfig();
//Url to attack
      $url = "https://github.com/login/oauth/access_token";
//Set parameters
      $parameters = array(
        "client_id" => $settings['app_id'],
        "client_secret" => $settings['app_secret'],
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
      $response = $this->performCURL($ch);
//Exposing the access token if it's necessary
      $this->access_token = $response['access_token'];
      $this->token_type = $response['token_type'];
//    error_log('>>>'.print_r(json_decode($this->access_token), true));
//Return the obtained token3
      return array('access_token' => $this->access_token);
    }
  }

  public function getRepositoriesList($params) {
    if ($params['userInfo']) {
      $user = $params['userInfo'];
      $url = "https://api.github.com/user/repos";
      $ch = $this->getConfiguredCURL($url, $user);
      $repos = $this->performCURL($ch);
      $response = array();
      foreach ($repos as $repo) {
        $repo['parent'] = $repo['parent'] ? TRUE : FALSE;
        array_push($response, $this->buildResponse($repo, self::REPOSITORY));
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
      $repo = $this->performCURL($ch);
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
      $prs = $this->performCURL($ch);
      $response = array();
      foreach ($prs as $pr) {
        array_push($response, $this->getPullRequest(
          array(
            "userInfo" => $user,
            "repo" => $repo,
            "id" => $pr['id']
          )
        )
        );
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
      $pr = $this->performCURL($ch);
      return $this->buildResponse($pr, self::PULL_REQUEST);
    }
  }

  protected function getUserDetail($params) { //Non-logged user
    if ($params['userInfo']) {
      $user = $params['userInfo'];
      $url = "https://api.github.com/users/" . $user->username;
      $ch = $this->getConfiguredCURL($url, $user);
      $response = $this->performCURL($ch);
      return $response;
    }
  }

  public function getAccount($params) {
    if ($params['userInfo']) {
      $user = $params['userInfo'];
      $url = "https://api.github.com/user/";
      $ch = $this->getConfiguredCURL($url, $user);
      $account = $this->performCURL($ch);
      $account['number_of_repos'] = $account['total_private_repos'] + $account['public_repos'];
      return $this->buildResponse($account, self::ACCOUNT);
    }
  }

  public function getConnectorType() {
    return GIT_TYPE_GITHUB;
  }

  protected function buildCustomMappings() {
    $this->mappings[self::PULL_REQUEST] = array(
      'pr_number' => 'number',
      'pr_name' => 'title',
      'pr_desc' => 'body',
      'username' => 'milestone->creator->login',
      'date' => 'milestone->updated_at',
      'commits' => 'commits',
      'comments' => 'comments',
      'from_branch' => 'head->label',
      'to_branch' => 'base->label',
    );
    $this->mappings[self::ACCOUNT] = array(
      'name' => 'name',
      'user' => 'login',
      'photo' => 'avatar_url',
      'id' => 'id',
      'location' => 'location',
      'company' => 'company',
      'repos' => 'number_of_repos' // it is autocalculated on getAccount method.
    );
    $this->mappings[self::REPOSITORY] = array(
      'repo_name' => 'name',
      'owner_user' => 'owner->login',
      'issues' => 'open_issues_count',
      'language' => 'language',
      'updated' => 'pushed_at',
      'forked_origin' => 'parent'

    );
  }

  protected function getPullRequestCommits($user, $repo, $pr_id) {
    $url = "https://api.github.com/repos/" . $user->usermname . "/" . $repo . "/pulls/" . $pr_id . "/commits";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = $this->performCURL($ch);
    return $response;
  }

  protected function getPullRequestComments($user, $repo, $pr_id) {
    $url = "https://api.github.com/repos/" . $user->usermname . "/" . $repo . "/pulls/" . $pr_id . "/comments";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = $this->performCURL($ch);
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

  protected function performCURL(&$ch) {
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
  }
}