# GitHub Actions note

Azure Deployment Center can automatically generate workflow YAML files for both:

1. Azure Web App
2. Azure Function App

After Azure creates the workflows, run:

```bash
git pull origin main
```

For Function App deployment, check the generated workflow and make sure the package path is:

```yaml
AZURE_FUNCTIONAPP_PACKAGE_PATH: './api'
```
