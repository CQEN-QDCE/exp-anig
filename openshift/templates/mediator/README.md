# Déploiement d'un agent médiateur ARIES sur OpenShift

Ce dépôt contient les instructions nécessaires pour déployer un agent médiateur [ARIES](https://www.hyperledger.org/use/aries) sur [OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift).

| Gabarit  | Descripton |
| -------- | ---------- |
| [mediator.yml](https://github.com/CQEN-QDCE/exp-anig/tree/main/openshift/templates/mediator/mediator.yml) | Installation de développement. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors de l'instanciation avec 'oc process'.

### Paramètres d'entrée requis

| Paramètre | Description |
| --------- | ----------- |
| **ROUTE_HOSTNAME** | Le nom d'hôte du serveur OpenShift |


Commencer par créer un projet sur OpenShift:
```bash
oc new-project aries-mediator
```

Lancez l'installation sur OpenShift
```bash
oc process -f mediator.yaml -p ROUTE_HOSTNAME=<nom d'hôte externe> | oc apply -f -
```

Remplacez _&lt;nom d'hôte externe&gt;_ par une valeur qui se résout à l'adresse du routeur OpenShift.

Une fois que tous les pods sont démarrés, vous devriez pouvoir accéder à l'agent médiateur à l'adresse https://aries-mediator.<nom d'hôte externe>/. Note: la réponse http de l'agent est vide par défaut.

Paramètres avec valeurs par défaut
| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **ROUTE_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'agent médiateur. | aries-mediator |
| **POSTGRES_DB** | Nom de la base de données PostgreSQL. | kms |
| **POSTGRES_USER** | Nom d'utilisateur PostgreSQL. | dbuser |
| **POSTGRES_PASSWORD** | Mot de passe de l'utilisateur PostgreSQL. | {auto-généré} |

## Récupérer l'url d'invitation de l'agent médiateur
Accéder au pod de l'agent médiateur via le terminal. Exécutez la commande: 
```bash
$ oc get pods
```
Prener en note le nom complet du pod 'aries-mediator'.

Afficher le journal du pod:
```bash
$ oc logs <nom du pod>
```
Remplacez _&lt;nom du pod&gt;_ par la valeur notée à l'étape précédente.

Trouver la ligne 'Invitation URL (Connections protocol):'
