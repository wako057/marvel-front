
@Library('jenkins-pipeline-libs') _
def common = new net.wako057.Common()
def git = new net.wako057.Git()
def APP_NAME = 'marvel-front-ng'
def APP_COMMIT

node {

  environment {

      registry = "nexus.wako057.net:18442/marvel-front-ng"
      registryCredential = "9a37329c-39f3-47c0-b173-e0321f9225d3"
  }

  docker.withRegistry("http://nexus.wako057.net") {
    wrap([$class: 'AnsiColorBuildWrapper']) {
      // Define docker image for slave
      def slave = docker.image('nexus.wako057.net:18442/marvel-front-ng:1.0')

      stage('Checkout code') {
        checkout scm
      }

      stage('Checkout Slave') {
        slave.pull()
      }

      slave.inside {
        stage('Init vars') {
          if (params.BUILD_TYPE && params.BUILD_TYPE == 'release') {
            env.BUILD_TYPE = params.BUILD_TYPE
            env.MAJOR_VERSION = params.MAJOR_VERSION
            env.MINOR_VERSION = params.MINOR_VERSION
            env.PATCH_VERSION = params.PATCH_VERSION
          }

          APP_COMMIT = git.getCommitHash()
        }

        stage('Install dependencies') {
          sh 'npm install --production'
        }

        stage('Jenkins Artifacts') {
          common.createArtifacts()
        }

        stage('Package app') {
          def options = '--exclude=./docker --exclude=./docker-compose.*'
          echo("Send artifacts to Nexus AVANT le move")
          common.createArchive(APP_NAME, APP_COMMIT, BUILD_ID, options)
          echo("Send artifacts to Nexus APRES le move")
        }

        stage('Send artifacts to Nexus') {
          echo("Send artifacts to Nexus AVANT le move")
         common.moveArchiveInProjet([
           name: APP_NAME,
           commit: APP_COMMIT,
           build_id: BUILD_ID
         ])
          echo("Send artifacts to Nexus APRES le move")

          common.sendToNexus([
                      name: APP_NAME,
                      commit: APP_COMMIT,
                      build_id: BUILD_ID,
                      branch_display: common.getNexusBranchName(env.BRANCH_NAME),
                      repo: common.getNexusRepoLabel(),
                      group: common.getNexusGroup(),
                      nexus: NEXUS_URL,
                      version: common.getBuildVersionName()
          ])
        }

        stage('Clean') {
          deleteDir();
        }
      }
    }
  }
}
