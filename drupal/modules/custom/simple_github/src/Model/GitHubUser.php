<?php

/**
 * @file
 * Contains \Drupal\simple_github\Model\GitHubUser.php
 */
namespace Drupal\simple_github\Model;

class GitHubUser {

  protected $id_github;
  protected $username;
  protected $token;

  /**
   * GitHubUser constructor.
   */
  public function __construct() {

  }

  /**
   * @return mixed
   */
  public function getIdGithub() {
    return $this->id_github;
  }

  /**
   * @param mixed $id_github
   */
  public function setIdGithub($id_github) {
    $this->id_github = $id_github;
  }

  /**
   * @return mixed
   */
  public function getUsername() {
    return $this->username;
  }

  /**
   * @param mixed $username
   */
  public function setUsername($username) {
    $this->username = $username;
  }

  /**
   * @return mixed
   */
  public function getToken() {
    return $this->token;
  }

  /**
   * @param mixed $token
   */
  public function setToken($token) {
   $this->token = $token;
  }


}