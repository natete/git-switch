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

    const CLIENT_ID ="cf0f72380b77a0ae16e9";
    const CLIENT_SECRET = "c6962314dc7945e8f2f09888d6ee61c352e867c8";

    protected $response;
    protected $response_status;
    protected $access_token;

    public function getAccessToken($code, $state){
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

//        $this->response = $this->request('POST', $url, $parameters);
//        ?access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&scope=user%2Cgist&token_type=bearer

        //Open curl stream
        $ch = $this->getConfiguredCURL($url);
        //set the url, number of POST vars, POST data
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, count($parameters));
        curl_setopt($ch,CURLOPT_POSTFIELDS,  http_build_query($parameters));


      $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);   //get status code
        $response = curl_exec($ch);

        //Close curl stream
        curl_close($ch);

        //Parse get-type response


      error_log('>>>'.print_r(json_decode($response), true));
        //Exposing the access token if it's necessary
        $this->access_token = $response['access_token'];
        $this->token_type = $response['token_type'];

        //Return the obtained token
        return $this->access_token;
    }

    protected function getHeaders() {
      $headers[] = 'Accept: application/json';
      // if we have the security token
      if (!empty($this->token_type)) {
        $headers[] = 'Bearer '.$this->access_token;
      }
      return $headers;
    }

    protected function getConfiguredCURL($url) {
      $ch = curl_init($url);
      //set the url, number of POST vars, POST data
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      $headers = $this->getHeaders();

      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

      return $ch;
    }
}