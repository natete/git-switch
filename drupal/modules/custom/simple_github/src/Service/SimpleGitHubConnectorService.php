<?php

/**
 * @file
 * Contains \Drupal\simple_github\Controller\SimpleGitHubConnectorController.
 */

namespace Drupal\simple_github\Service;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\user\UserDataInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;


class SimpleGitHubConnectorService {

  const CLIENT_ID = "cf0f72380b77a0ae16e9";
  const CLIENT_SECRET = "c6962314dc7945e8f2f09888d6ee61c352e867c8";

  public $user = array('username' => 'carlosraigadaherrera', 'token' => 'bb38660926b371ec8c967f68bad02ae1deb95d11');

  protected $response;
  protected $response_status;
  protected $access_token;

  public function getAccessToken($code, $state) {
// AVANGELIO: https://gist.github.com/aaronpk/3612742
    $config = \Drupal::config('simple_github.settings');

//Url to attack
    $url = "https://github.com/login/oauth/access_token";

//Set parameters
    $parameters = array(
      "client_id" => 'cf0f72380b77a0ae16e9',
      "client_secret" => 'c6962314dc7945e8f2f09888d6ee61c352e867c8',
      "code" => $code,
      "redirect_uri" => "",
      "state" => $state
    );

//Open curl stream
    $ch = $this->getConfiguredCURL($url);
//set the url, number of POST vars, POST data
//    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, count($parameters));
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameters));


    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);   //get status code
    $response = curl_exec($ch);

//Close curl stream
    curl_close($ch);

    error_log('>>>' . print_r(json_decode($response), TRUE));
//Exposing the access token if it's necessary
    $this->access_token = $response['access_token'];
    $this->token_type = $response['token_type'];
//    error_log('>>>'.print_r(json_decode($this->access_token), true));
//Return the obtained token3
    return $this->access_token;
  }

  public function getRepositoriesByUser($user) {

    $url = "https://api.github.com/user/repos";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getRepositoryByName($user, $name) {
    $url = "https://api.github.com/" . $user->username . "/" . $name;
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getPullRequestList($user, $repo) {
    $url = "https://api.github.com/repos/" . $user->username . "/" . $repo . "/pulls";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getPullRequestById($user, $repo, $id) {
    $url = "https://api.github.com/repos/" . $user->username . "/" . $repo . "/pulls/" . $id;
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getUserDetail($user) {
    $url = "https://api.github.com/users/" . $user->username;
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getLoggedUser($user) {
    $url = "https://api.github.com/user/";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getPullRequestCommits($user, $repo, $pr_id) {
    $url = "https://api.github.com/repos/" . $user->usermname . "/" . $repo . "/pulls/" . $pr_id . "/commits";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getPullRequestComments($user, $repo, $pr_id) {
    $url = "https://api.github.com/repos/" . $user->usermname . "/" . $repo . "/pulls/" . $pr_id . "/comments";
    $ch = $this->getConfiguredCURL($url, $user);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  public function getHeaders() {
    $headers[] = ['Accept: application/json'];
    array_push($headers, 'User-Agent: Gitswitch-App');
// if we have the security token
//    if (!empty($this->token_type)) {
//      array_push($headers,'Bearer ' . $this->user['token']);
//    }
    return $headers;
  }

  protected function getConfiguredCURL($url, $user = NULL) {
    $ch = curl_init($url);
//set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $headers = $this->getHeaders();
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    if($user!=null){
      $test = $user['username'].':'.$user['token'];
    }
    curl_setopt($ch, CURLOPT_USERPWD, $test);

    return $ch;
  }
}