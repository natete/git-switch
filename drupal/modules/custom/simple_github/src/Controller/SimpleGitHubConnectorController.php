<?php

/**
 * @file
 * Contains \Drupal\simple_github\Controller\SimpleGithubConnectorController.
 */

namespace Drupal\simple_github\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\user\UserDataInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;


class SimpleGitHubConnetionController extends ControllerBase implements ContainerInjectionInterface{

    const CLIENT_ID ="";
    const CLIENT_SECRET = "";

    protected $response;
    protected $response_status;
    protected $access_token;

    public function __construct(){

    }
    public static function create(ContainerInterface $container){

    }

    public function getAccessToken($code, $state){
        //Url to attack
        $url = "https://github.com/login/oauth/access_token";

        //Set parameters
        $parameters = array(
            "client_id" => CLIENT_ID,
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