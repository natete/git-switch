<?php

/**
 * @file
 * Contains \Drupal\simple_gihub\Form\SimpleGitHbubSettingsForm.
 */

namespace Drupal\simple_github\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Config\ConfigFactory;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a deletion confirmation form for the block instance deletion form.
 */
class SimpleGitHubSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    /** @var \Drupal\Core\Config\ConfigFactory $config */
    $config = $container->get('config.factory');
    return new static($config);
  }

  /**
   * Constructs a SimpleGitHubSettingsForm object.
   *
   * @param \Drupal\Core\Config\ConfigFactory $config_factory
   *   The config service.
   */
  public function __construct(ConfigFactory $config_factory) {
    parent::__construct($config_factory);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'simple_github.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'simple_github_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $config = $this->configFactory->get('simple_github.settings');

    $form = array();

    $form['app_id'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('GitHub App Id'),
      '#description' => $this->t('GitHub App Id value'),
      '#default_value' => $config->get('app_id'),
    );

    $form['app_secret'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('GitHub App Secret'),
      '#description' => $this->t('GitHub App Secret value'),
      '#default_value' => $config->get('app_secret'),
    );

    $form['app_url_redirect'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('GitHub URL Redirect'),
      '#description' => $this->t('GitHub URL Redirect value'),
      '#default_value' => $config->get('app_url_redirect'),
    );

    $form['#submit'][] = array($this, 'submitForm');

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);

    // App Id validation
    if (empty($form_state->getValue('app_id', ''))) {
      $form_state->setErrorByName('app_id', $this->t('The App Id cannot be empty'));
    }

    // App Secret validation
    if (empty($form_state->getValue('app_secret', ''))) {
      $form_state->setErrorByName('app_secret', $this->t('The App Secret cannot be empty'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    \Drupal::configFactory()->getEditable('simple_github.settings')
      ->set('app_id', $form_state->getValue('app_id'))
      ->set('app_secret', $form_state->getValue('app_secret'))
      ->set('app_url_redirect', $form_state->getValue('app_url_redirect'))
      ->save();
  }

}
