// context: liquibase_test_new
// This file contains changes for the liquibase_test database

db.dp_sc_dxp_catalog_data_provider.updateOne(
  {"providerType" : "HRIS_HIBOB"},
  { 
    $addToSet: { 
      "customConfigs.allowReverseSync": "658e26dd6409d6d3d87a85be" 
    } 
  }
)
