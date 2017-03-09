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

        $config = \Drupal::config('simple_github.settings');

        //Url to attack
        $url = "https://github.com/login/oauth/access_token";

        //Set parameters
        $parameters = array(
            "client_id" => $config->get('app_id'),
            "client_secret" => CLIENT_SECRET,
            "code" => $code,
            "redirect_uri" => "",
            "state" => $state
        );

//        $this->response = $this->request('POST', $url, $parameters);
//        ?access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&scope=user%2Cgist&token_type=bearer
        $fields_string = "";
        //Parsing for curl syntax
        foreach($parameters as $key=>$value) {
            $fields_string .= $key.'='.$value.'&';
        }
        rtrim($fields_string,'& ');

        //Open curl stream
        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, count($parameters));
        curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

        $response = curl_exec($ch);

        //Close curl stream
        curl_close($ch);

        //Parse get-type response
        parse_str($response['query'], $response_params);

        //Exposing the access token if it's necessary
        $this->access_token = $response_params['access_token'];

        //Return the obtained token
        return $this->access_token;
    }
}