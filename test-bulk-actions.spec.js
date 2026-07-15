import { test, expect } from 'playwright/test';

test.describe('Bulk Actions Prototype Tests', () => {
  test('should test bulk actions functionality', async ({ page }) => {
    console.log('\n=== Starting Bulk Actions Tests ===\n');
    
    // Navigate to the app
    await page.goto('http://localhost:5174/');
    
    // Test 1: Verify the page loads with the guide manager view
    console.log('Test 1: Verifying page loads with guide manager view...');
    await page.waitForLoadState('networkidle');
    
    const sidebar = await page.locator('.side-nav, [class*="sidebar"], nav').first();
    const folderTree = await page.locator('[class*="folder"], [class*="tree"]').first();
    const contentList = await page.locator('[class*="content"], [class*="list"]').first();
    
    const sidebarVisible = await sidebar.isVisible().catch(() => false);
    const folderTreeVisible = await folderTree.isVisible().catch(() => false);
    const contentListVisible = await contentList.isVisible().catch(() => false);
    
    console.log(`  ✓ Sidebar visible: ${sidebarVisible}`);
    console.log(`  ✓ Folder tree visible: ${folderTreeVisible}`);
    console.log(`  ✓ Content list visible: ${contentListVisible}`);
    
    // Test 2: Click on a few checkboxes to select items
    console.log('\nTest 2: Selecting items via checkboxes...');
    
    // Look for checkbox elements within content rows
    const checkboxElements = await page.locator('.checkbox, [class*="checkbox"]').all();
    console.log(`  Found ${checkboxElements.length} checkbox elements`);
    
    if (checkboxElements.length >= 3) {
      await checkboxElements[0].click();
      await checkboxElements[1].click();
      await checkboxElements[2].click();
      console.log('  ✓ Clicked 3 checkboxes');
      await page.waitForTimeout(500);
    } else if (checkboxElements.length > 0) {
      for (let i = 0; i < Math.min(checkboxElements.length, 3); i++) {
        await checkboxElements[i].click();
      }
      console.log(`  ✓ Clicked ${Math.min(checkboxElements.length, 3)} checkboxes`);
      await page.waitForTimeout(500);
    }
    
    // Verify bulk actions bar appears
    console.log('\nTest 2b: Verifying bulk actions bar appears...');
    const bulkActionsBar = await page.locator('.bulk-actions-bar').first();
    const bulkBarVisible = await bulkActionsBar.isVisible().catch(() => false);
    console.log(`  ✓ Bulk actions bar visible: ${bulkBarVisible}`);
    
    if (bulkBarVisible) {
      const selectedText = await bulkActionsBar.textContent();
      console.log(`  ✓ Bulk actions bar text: "${selectedText.trim()}"`);
      
      if (selectedText.includes('Items selected') || selectedText.includes('Item selected')) {
        console.log('  ✓ "X Items selected" text found');
      } else {
        console.log('  ⚠ "X Items selected" text NOT found');
      }
    }
    
    // Test 3: Check that action buttons are disabled
    console.log('\nTest 3: Checking that action buttons are visually grayed/disabled...');
    
    const buttons = [
      { name: 'Move to...', selector: 'button:has-text("Move to...")' },
      { name: 'Duplicate', selector: 'button:has-text("Duplicate")' },
      { name: 'Publish last version', selector: 'button:has-text("Publish last version")' },
      { name: 'More', selector: '.bulk-action-more' }
    ];
    
    for (const btn of buttons) {
      const locator = page.locator(btn.selector).first();
      const visible = await locator.isVisible().catch(() => false);
      if (visible) {
        const disabled = await locator.isDisabled().catch(() => false);
        const classes = await locator.getAttribute('class').catch(() => '');
        const opacity = await locator.evaluate(el => window.getComputedStyle(el).opacity).catch(() => '1');
        const cursor = await locator.evaluate(el => window.getComputedStyle(el).cursor).catch(() => 'default');
        
        console.log(`  ${btn.name}:`);
        console.log(`    - Visible: ${visible}`);
        console.log(`    - Disabled attribute: ${disabled}`);
        console.log(`    - Classes: ${classes}`);
        console.log(`    - Opacity: ${opacity}`);
        console.log(`    - Cursor: ${cursor}`);
        console.log(`    - Appears grayed/disabled: ${disabled || classes.includes('disabled') || parseFloat(opacity) < 0.7}`);
      } else {
        console.log(`  ${btn.name}: NOT FOUND`);
      }
    }
    
    // Test 4: Look for "Recently deleted" in sidebar
    console.log('\nTest 4: Looking for "Recently deleted" entry in sidebar...');
    // The label has a line break, so we need to look for it differently
    const recentlyDeleted = await page.locator('.side-nav-item:has-text("Recently")').last();
    const recentlyDeletedVisible = await recentlyDeleted.isVisible().catch(() => false);
    console.log(`  ✓ "Recently deleted" visible: ${recentlyDeletedVisible}`);
    
    if (recentlyDeletedVisible) {
      const recentlyDeletedText = await recentlyDeleted.textContent();
      console.log(`  ✓ "Recently deleted" text: "${recentlyDeletedText.trim()}"`);
      
      const tagsElement = await page.locator('.side-nav-item:has-text("Tags")').first();
      const tagsVisible = await tagsElement.isVisible().catch(() => false);
      
      if (tagsVisible) {
        const tagsBox = await tagsElement.boundingBox();
        const deletedBox = await recentlyDeleted.boundingBox();
        
        if (tagsBox && deletedBox) {
          const isBelow = deletedBox.y > tagsBox.y;
          console.log(`  ✓ "Recently deleted" is ${isBelow ? 'BELOW' : 'ABOVE'} "Tags"`);
          console.log(`    Tags Y position: ${tagsBox.y}`);
          console.log(`    Recently deleted Y position: ${deletedBox.y}`);
        }
      } else {
        console.log('  ⚠ Tags element not found for position comparison');
      }
    }
    
    // Test 5: Take screenshot
    console.log('\nTest 5: Taking screenshot of initial state with items selected...');
    await page.screenshot({ 
      path: 'bulk-actions-test-screenshot.png',
      fullPage: true 
    });
    console.log('  ✓ Screenshot saved as: bulk-actions-test-screenshot.png');
    
    // Check for any console errors
    console.log('\n=== Checking for Console Errors ===');
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait a bit to catch any errors
    await page.waitForTimeout(1000);
    
    if (errors.length > 0) {
      console.log('Console Errors Found:');
      errors.forEach(err => console.log(`  ❌ ${err}`));
    } else {
      console.log('  ✓ No console errors detected');
    }
    
    console.log('\n=== Tests Complete ===\n');
  });
});
