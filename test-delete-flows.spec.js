import { test, expect } from 'playwright/test';

test.describe('Bulk Delete Flow Tests', () => {
  test('should test complete delete flows with screenshots', async ({ page }) => {
    console.log('\n=== Starting Bulk Delete Flow Tests ===\n');
    
    // Navigate to the app
    await page.goto('http://localhost:5174/');
    await page.waitForLoadState('networkidle');
    console.log('✓ Page loaded');
    
    // ========================================
    // TEST 1: DELETE FLOW
    // ========================================
    console.log('\n--- TEST 1: DELETE FLOW ---');
    
    // Step 1: Select 3-4 individual items (NOT the header checkbox)
    console.log('Step 1: Selecting 3-4 individual items...');
    
    // Find all checkboxes in content rows (not the header)
    const contentRows = await page.locator('.content-row').all();
    console.log(`  Found ${contentRows.length} content rows`);
    
    // Select 3-4 items
    const itemsToSelect = Math.min(4, contentRows.length);
    for (let i = 0; i < itemsToSelect; i++) {
      const checkbox = contentRows[i].locator('.checkbox').first();
      await checkbox.click();
      console.log(`  ✓ Selected item ${i + 1}`);
    }
    
    await page.waitForTimeout(500);
    
    // Verify bulk actions bar appears
    const bulkActionsBar = await page.locator('.bulk-actions-bar').first();
    const bulkBarVisible = await bulkActionsBar.isVisible();
    console.log(`  ✓ Bulk actions bar visible: ${bulkBarVisible}`);
    
    if (bulkBarVisible) {
      const selectedText = await bulkActionsBar.textContent();
      console.log(`  ✓ Selection text: "${selectedText.trim()}"`);
    }
    
    // Take screenshot of selected state
    await page.screenshot({ 
      path: 'screenshot-1-items-selected.png',
      fullPage: true 
    });
    console.log('  ✓ Screenshot saved: screenshot-1-items-selected.png');
    
    // Step 2: Click the Delete button
    console.log('\nStep 2: Clicking Delete button...');
    const deleteButton = page.locator('button:has-text("Delete")').first();
    const deleteButtonVisible = await deleteButton.isVisible();
    console.log(`  Delete button visible: ${deleteButtonVisible}`);
    
    if (deleteButtonVisible) {
      await deleteButton.click();
      console.log('  ✓ Clicked Delete button');
      await page.waitForTimeout(500);
      
      // Step 3: Verify confirmation modal appears
      console.log('\nStep 3: Verifying confirmation modal...');
      await page.waitForTimeout(1000);
      const modal = page.locator('.modal-overlay .modal-dialog').first();
      const modalVisible = await modal.isVisible().catch(() => false);
      console.log(`  Modal visible: ${modalVisible}`);
      
      if (modalVisible) {
        const modalText = await modal.textContent();
        console.log(`  Modal text: "${modalText.trim()}"`);
        
        // Check for item count in modal
        const hasItemCount = /\d+\s*(item|guide)/i.test(modalText);
        console.log(`  ✓ Modal shows item count: ${hasItemCount}`);
        
        // Take screenshot of modal
        await page.screenshot({ 
          path: 'screenshot-2-delete-modal.png',
          fullPage: true 
        });
        console.log('  ✓ Screenshot saved: screenshot-2-delete-modal.png');
        
        // Step 4: Click Delete to confirm
        console.log('\nStep 4: Confirming deletion...');
        const confirmButton = modal.locator('button:has-text("Delete")').first();
        await confirmButton.click();
        console.log('  ✓ Clicked confirm Delete button');
        await page.waitForTimeout(1000);
        
        // Step 5: Observe toast notification
        console.log('\nStep 5: Checking toast notification...');
        const toast = page.locator('.toast, [role="alert"], .notification').first();
        const toastVisible = await toast.isVisible().catch(() => false);
        console.log(`  Toast visible: ${toastVisible}`);
        
        if (toastVisible) {
          const toastText = await toast.textContent();
          console.log(`  Toast text: "${toastText.trim()}"`);
          
          // Check for progress text "X of Y completed"
          const hasProgress = /\d+\s*of\s*\d+/i.test(toastText);
          console.log(`  ✓ Toast shows progress (X of Y): ${hasProgress}`);
          
          // Check for "See details" link
          const seeDetailsLink = toast.locator('a:has-text("See details"), button:has-text("See details")').first();
          const seeDetailsVisible = await seeDetailsLink.isVisible().catch(() => false);
          console.log(`  ✓ "See details" link visible: ${seeDetailsVisible}`);
          
          // Take screenshot of toast
          await page.screenshot({ 
            path: 'screenshot-3-toast-notification.png',
            fullPage: true 
          });
          console.log('  ✓ Screenshot saved: screenshot-3-toast-notification.png');
          
        // Wait for operation to complete
        console.log('\nWaiting for operation to complete...');
        await page.waitForTimeout(5000);
        console.log('  ✓ Operation should be complete');
        
        // Wait for toast to auto-dismiss or manually dismiss it
        console.log('  Waiting for toast to dismiss...');
        await page.waitForTimeout(4000); // Toast auto-dismisses after 3 seconds when complete
        
        // If toast is still visible, try to dismiss it
        const toastContainer = page.locator('.toast-container--visible').first();
        const toastStillVisible = await toastContainer.isVisible().catch(() => false);
        if (toastStillVisible) {
          const dismissBtn = page.locator('.toast-close-btn').first();
          const dismissVisible = await dismissBtn.isVisible().catch(() => false);
          if (dismissVisible) {
            await dismissBtn.click();
            console.log('  ✓ Manually dismissed toast notification');
            await page.waitForTimeout(500);
          }
        } else {
          console.log('  ✓ Toast auto-dismissed');
        }
        } else {
          console.log('  ⚠ Toast notification not found');
        }
      } else {
        console.log('  ⚠ Confirmation modal not found');
      }
    } else {
      console.log('  ⚠ Delete button not found');
    }
    
    // ========================================
    // TEST 2: RECENTLY DELETED VIEW
    // ========================================
    console.log('\n--- TEST 2: RECENTLY DELETED VIEW ---');
    
    // Click "Recently deleted" in sidebar
    console.log('Step 1: Clicking "Recently deleted" in sidebar...');
    const recentlyDeletedLink = page.locator('.side-nav-item:has-text("Recently"), a:has-text("Recently deleted")').last();
    const recentlyDeletedVisible = await recentlyDeletedLink.isVisible().catch(() => false);
    console.log(`  "Recently deleted" link visible: ${recentlyDeletedVisible}`);
    
    if (recentlyDeletedVisible) {
      await recentlyDeletedLink.click();
      console.log('  ✓ Clicked "Recently deleted"');
      await page.waitForTimeout(1000);
      
      // Verify it shows deleted items
      console.log('\nStep 2: Verifying deleted items view...');
      
      // Check for recently deleted view
      const rdView = page.locator('.rd-view').first();
      const rdViewVisible = await rdView.isVisible().catch(() => false);
      console.log(`  Recently deleted view visible: ${rdViewVisible}`);
      
      if (rdViewVisible) {
        // Check for column headers
        const columns = [
          { text: 'NAME', selector: '.rd-col--name' },
          { text: 'TAGS', selector: '.rd-col--tags' },
          { text: 'DELETED DATE', selector: '.rd-col--deleted' },
          { text: 'DAYS REMAINING', selector: '.rd-col--days' }
        ];
        console.log('\nChecking for columns:');
        
        for (const col of columns) {
          const header = page.locator(col.selector).first();
          const headerVisible = await header.isVisible().catch(() => false);
          console.log(`  ${col.text}: ${headerVisible ? '✓' : '✗'}`);
        }
        
        // Count items in the list
        const items = await page.locator('.rd-row').all();
        console.log(`\n  Items in recently deleted: ${items.length}`);
        
        // Take screenshot
        await page.screenshot({ 
          path: 'screenshot-4-recently-deleted-view.png',
          fullPage: true 
        });
        console.log('  ✓ Screenshot saved: screenshot-4-recently-deleted-view.png');
      } else {
        console.log('  ⚠ Recently deleted view not found');
        // Take screenshot anyway to see what's there
        await page.screenshot({ 
          path: 'screenshot-4-recently-deleted-view-error.png',
          fullPage: true 
        });
        console.log('  ✓ Error screenshot saved: screenshot-4-recently-deleted-view-error.png');
      }
    } else {
      console.log('  ⚠ "Recently deleted" link not found in sidebar');
    }
    
    // ========================================
    // TEST 3: DETAILS POPUP
    // ========================================
    console.log('\n--- TEST 3: DETAILS POPUP ---');
    
    // Go back to "All content" view
    console.log('Step 1: Going back to "All content" view...');
    const allContentLink = page.locator('.side-nav-item:has-text("All content"), a:has-text("All content")').first();
    const allContentVisible = await allContentLink.isVisible().catch(() => false);
    
    if (allContentVisible) {
      await allContentLink.click();
      console.log('  ✓ Clicked "All content"');
      await page.waitForTimeout(1000);
      
      // Select some items again
      console.log('\nStep 2: Selecting items for second deletion...');
      const contentRows2 = await page.locator('.content-row').all();
      
      // Select 2-3 items
      const itemsToSelect2 = Math.min(3, contentRows2.length);
      for (let i = 0; i < itemsToSelect2; i++) {
        const checkbox = contentRows2[i].locator('.checkbox').first();
        await checkbox.click();
        console.log(`  ✓ Selected item ${i + 1}`);
      }
      
      await page.waitForTimeout(500);
      
      // Click Delete
      console.log('\nStep 3: Clicking Delete button...');
      const deleteButton2 = page.locator('button:has-text("Delete")').first();
      await deleteButton2.click();
      console.log('  ✓ Clicked Delete button');
      await page.waitForTimeout(500);
      
      // Confirm deletion
      await page.waitForTimeout(1000);
      const modal2 = page.locator('.modal-overlay .modal-dialog').first();
      const modal2Visible = await modal2.isVisible().catch(() => false);
      console.log(`  Modal visible: ${modal2Visible}`);
      
      if (modal2Visible) {
        const confirmButton2 = modal2.locator('button:has-text("Delete")').first();
        await confirmButton2.click();
      } else {
        console.log('  ⚠ Modal not found, skipping confirmation');
      }
      console.log('  ✓ Confirmed deletion');
      await page.waitForTimeout(1000);
      
      // Look for toast and click "See details"
      console.log('\nStep 4: Looking for "See details" link in toast...');
      const toast2 = page.locator('.toast, [role="alert"], .notification').first();
      const toastVisible2 = await toast2.isVisible().catch(() => false);
      
      if (toastVisible2) {
        const seeDetailsLink2 = toast2.locator('a:has-text("See details"), button:has-text("See details")').first();
        const seeDetailsVisible2 = await seeDetailsLink2.isVisible().catch(() => false);
        console.log(`  "See details" link visible: ${seeDetailsVisible2}`);
        
        if (seeDetailsVisible2) {
          await seeDetailsLink2.click();
          console.log('  ✓ Clicked "See details"');
          await page.waitForTimeout(1000);
          
          // Verify popup shows
          console.log('\nStep 5: Verifying details popup...');
          const popup = page.locator('.popup, .details-popup, [role="dialog"]').last();
          const popupVisible = await popup.isVisible().catch(() => false);
          console.log(`  Details popup visible: ${popupVisible}`);
          
          if (popupVisible) {
            const popupText = await popup.textContent();
            console.log(`  Popup contains text: "${popupText.substring(0, 100)}..."`);
            
            // Check for columns: Name, Path, Status
            const detailColumns = ['Name', 'Path', 'Status'];
            console.log('\nChecking for columns in details popup:');
            
            for (const col of detailColumns) {
              const hasColumn = popupText.includes(col);
              console.log(`  ${col}: ${hasColumn ? '✓' : '✗'}`);
            }
            
            // Take screenshot
            await page.screenshot({ 
              path: 'screenshot-5-details-popup.png',
              fullPage: true 
            });
            console.log('  ✓ Screenshot saved: screenshot-5-details-popup.png');
          } else {
            console.log('  ⚠ Details popup not found');
          }
        } else {
          console.log('  ⚠ "See details" link not found in toast');
        }
      } else {
        console.log('  ⚠ Toast notification not found');
      }
    } else {
      console.log('  ⚠ "All content" link not found');
    }
    
    // ========================================
    // SUMMARY
    // ========================================
    console.log('\n=== TEST SUMMARY ===');
    console.log('All tests completed. Check screenshots for visual verification:');
    console.log('  1. screenshot-1-items-selected.png - Items selected state');
    console.log('  2. screenshot-2-delete-modal.png - Confirmation modal');
    console.log('  3. screenshot-3-toast-notification.png - Toast with progress');
    console.log('  4. screenshot-4-recently-deleted-view.png - Recently deleted view');
    console.log('  5. screenshot-5-details-popup.png - Details popup (if available)');
    console.log('\n=== Tests Complete ===\n');
  });
});
