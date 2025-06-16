// test-workflow.js
const Workflow = require('./models/workflow.model');

async function testWorkflowModel() {
  try {
    // Test the Workflow model by fetching all workflows
    const workflows = await Workflow.findAll({ limit: 5 });
    
    console.log(' Successfully fetched workflows:');
    console.log(JSON.stringify(workflows, null, 2));
    
    // Count total records
    const count = await Workflow.count();
    console.log(` Total workflows in database: ${count}`);
    
    return true;
  } catch (error) {
    console.error(' Error testing Workflow model:', error);
    return false;
  }
}

// Run the test
testWorkflowModel()
  .then(success => {
    console.log(success ? 'Workflow model test passed!' : 'Workflow model test failed.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });