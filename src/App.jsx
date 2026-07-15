import { useState, useCallback, useEffect, useRef } from 'react';
import AppHeader from './components/AppHeader';
import SideNav from './components/SideNav';
import FolderTree from './components/FolderTree';
import ContentArea from './components/ContentArea';
import RecentlyDeletedView from './components/RecentlyDeletedView';
import Toast from './components/Toast';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import DetailsPopup from './components/DetailsPopup';
import FolderPickerModal from './components/FolderPickerModal';
import CreateShallowCopyModal from './components/CreateShallowCopyModal';
import ShallowCopyToast from './components/ShallowCopyToast';
import ShallowCopyInfoBar from './components/ShallowCopyInfoBar';
import ViewOccurrencesPanel from './components/ViewOccurrencesPanel';
import ShallowCopyRestrictedModal from './components/ShallowCopyRestrictedModal';
import './App.css';

const FOLDER_TREE_DATA = {
  id: 'stonly-home',
  name: 'Stonly Home',
  type: 'home',
  children: [
    {
      id: 'help-center',
      name: 'Help center',
      type: 'root',
      expanded: true,
      children: [
        { id: 'getting-started', name: 'Getting started', type: 'folder', children: [] },
        { id: 'account-team', name: 'Account and team', type: 'folder', children: [] },
        { id: 'settings', name: 'Settings', type: 'folder', children: [] },
        { id: 'billing-plans', name: 'Billing and plans', type: 'folder', children: [] },
        { id: 'integrations', name: 'Integrations', type: 'folder', children: [] },
        { id: 'troubleshooting', name: 'Troubleshooting', type: 'folder', children: [] },
        { id: 'security-privacy', name: 'Security and privacy', type: 'folder', children: [] },
        { id: 'api-reference', name: 'API reference', type: 'folder', children: [] },
        { id: 'analytics-reports', name: 'Analytics and reports', type: 'folder', children: [] },
        { id: 'customization', name: 'Customization', type: 'folder', children: [] },
        { id: 'release-notes', name: 'Release notes', type: 'folder', children: [] },
      ],
    },
    {
      id: 'internal',
      name: 'Internal',
      type: 'folder',
      locked: true,
      children: [
        { id: 'compliance', name: 'Compliance', type: 'folder', children: [] },
        { id: 'team-policies', name: 'Team policies', type: 'folder', children: [] },
      ],
    },
  ],
};

const HELP_CENTER_ITEMS = [
  { id: 'getting-started', name: 'Getting started', type: 'folder', guides: 3, folders: 10, tags: '-', status: null, lastEdited: 'February 4, 2022' },
  { id: 'account-team', name: 'Account and team', type: 'folder', guides: 3, folders: 10, tags: '-', status: null, lastEdited: 'February 4, 2022' },
  { id: 'settings', name: 'Settings', type: 'folder', guides: 3, folders: 10, tags: '-', status: null, lastEdited: 'February 4, 2022' },
  { id: 'billing-plans', name: 'Billing and plans', type: 'folder', guides: 5, folders: 2, tags: '-', status: null, lastEdited: 'January 15, 2022' },
  { id: 'integrations', name: 'Integrations', type: 'folder', guides: 12, folders: 4, tags: '-', status: null, lastEdited: 'March 1, 2022' },
  { id: 'troubleshooting', name: 'Troubleshooting', type: 'folder', guides: 8, folders: 3, tags: '-', status: null, lastEdited: 'February 20, 2022' },
  { id: 'security-privacy', name: 'Security and privacy', type: 'folder', guides: 6, folders: 1, tags: '-', status: null, lastEdited: 'December 10, 2021' },
  { id: 'api-reference', name: 'API reference', type: 'folder', guides: 14, folders: 5, tags: '-', status: null, lastEdited: 'March 8, 2022' },
  { id: 'analytics-reports', name: 'Analytics and reports', type: 'folder', guides: 7, folders: 2, tags: '-', status: null, lastEdited: 'January 28, 2022' },
  { id: 'customization', name: 'Customization', type: 'folder', guides: 9, folders: 3, tags: '-', status: null, lastEdited: 'February 12, 2022' },
  { id: 'release-notes', name: 'Release notes', type: 'folder', guides: 18, folders: 0, tags: '-', status: null, lastEdited: 'March 10, 2022' },
  { id: '12', name: 'Three Step Guide Template', type: 'guide', steps: 3, tags: '-', status: 'draft', lastEdited: 'A moment ago' },
  { id: '13', name: 'How to set up your first project', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: '2 hours ago' },
  { id: '14', name: 'How to customize content with custom code', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: '1 week ago', locked: true },
  { id: '15', name: 'Release note - February', type: 'guide', steps: 1, tags: '-', status: 'draft', lastEdited: '1 month ago' },
  { id: '16', name: 'Turning on and off the events', type: 'checklist', steps: 4, tags: '-', status: 'published', lastEdited: '3 months ago' },
  { id: '17', name: 'Creating your first guide', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'January 3, 2022' },
  { id: '18', name: 'Inviting team members', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'January 5, 2022' },
  { id: '19', name: 'Managing user roles and permissions', type: 'guide', steps: 7, tags: '-', status: 'published', lastEdited: 'January 8, 2022' },
  { id: '20', name: 'Setting up SSO authentication', type: 'guide', steps: 9, tags: '-', status: 'draft', lastEdited: 'January 10, 2022' },
  { id: '21', name: 'Configuring email notifications', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'January 12, 2022' },
  { id: '22', name: 'How to embed guides on your website', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'January 14, 2022' },
  { id: '23', name: 'Widget placement and targeting', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'January 16, 2022' },
  { id: '24', name: 'Customizing the knowledge base theme', type: 'guide', steps: 8, tags: '-', status: 'published', lastEdited: 'January 18, 2022' },
  { id: '25', name: 'Using custom CSS in guides', type: 'guide', steps: 4, tags: '-', status: 'draft', lastEdited: 'January 20, 2022' },
  { id: '26', name: 'Adding images and videos to steps', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'January 22, 2022' },
  { id: '27', name: 'Working with branching logic', type: 'guide', steps: 10, tags: '-', status: 'published', lastEdited: 'January 24, 2022' },
  { id: '28', name: 'Setting up conditional steps', type: 'guide', steps: 6, tags: '-', status: 'draft', lastEdited: 'January 25, 2022' },
  { id: '29', name: 'Onboarding checklist setup', type: 'checklist', steps: 8, tags: '-', status: 'published', lastEdited: 'January 26, 2022' },
  { id: '30', name: 'Product tour best practices', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'January 27, 2022' },
  { id: '31', name: 'How to use the analytics dashboard', type: 'guide', steps: 7, tags: '-', status: 'published', lastEdited: 'January 28, 2022' },
  { id: '32', name: 'Tracking guide completion rates', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'January 29, 2022' },
  { id: '33', name: 'Exporting analytics data', type: 'guide', steps: 3, tags: '-', status: 'draft', lastEdited: 'January 30, 2022' },
  { id: '34', name: 'Connecting Zendesk integration', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'February 1, 2022' },
  { id: '35', name: 'Connecting Intercom integration', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'February 2, 2022' },
  { id: '36', name: 'Connecting Salesforce integration', type: 'guide', steps: 8, tags: '-', status: 'draft', lastEdited: 'February 3, 2022' },
  { id: '37', name: 'Connecting HubSpot integration', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'February 4, 2022' },
  { id: '38', name: 'Slack notifications setup', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'February 5, 2022' },
  { id: '39', name: 'Webhook configuration guide', type: 'guide', steps: 7, tags: '-', status: 'published', lastEdited: 'February 6, 2022' },
  { id: '40', name: 'Zapier integration walkthrough', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'February 7, 2022' },
  { id: '41', name: 'Segment integration setup', type: 'guide', steps: 5, tags: '-', status: 'draft', lastEdited: 'February 8, 2022' },
  { id: '42', name: 'Google Analytics tracking setup', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'February 9, 2022' },
  { id: '43', name: 'Using the REST API', type: 'guide', steps: 12, tags: '-', status: 'published', lastEdited: 'February 10, 2022' },
  { id: '44', name: 'API authentication and keys', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'February 11, 2022' },
  { id: '45', name: 'Rate limits and best practices', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'February 12, 2022' },
  { id: '46', name: 'Managing billing information', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'February 13, 2022' },
  { id: '47', name: 'Upgrading your plan', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'February 14, 2022' },
  { id: '48', name: 'Understanding usage limits', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'February 15, 2022' },
  { id: '49', name: 'Cancellation and refund policy', type: 'guide', steps: 2, tags: '-', status: 'draft', lastEdited: 'February 16, 2022' },
  { id: '50', name: 'Two-factor authentication setup', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'February 17, 2022' },
  { id: '51', name: 'Data retention and deletion', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'February 18, 2022' },
  { id: '52', name: 'GDPR compliance overview', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'February 19, 2022' },
  { id: '53', name: 'SOC 2 certification details', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'February 20, 2022' },
  { id: '54', name: 'Password policy configuration', type: 'guide', steps: 4, tags: '-', status: 'draft', lastEdited: 'February 21, 2022' },
  { id: '55', name: 'IP allowlisting setup', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'February 22, 2022' },
  { id: '56', name: 'Custom domain configuration', type: 'guide', steps: 7, tags: '-', status: 'published', lastEdited: 'February 23, 2022' },
  { id: '57', name: 'White-labeling your knowledge base', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'February 24, 2022' },
  { id: '58', name: 'Multi-language support setup', type: 'guide', steps: 8, tags: '-', status: 'draft', lastEdited: 'February 25, 2022' },
  { id: '59', name: 'Translation management workflow', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'February 26, 2022' },
  { id: '60', name: 'Content versioning and history', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'February 27, 2022' },
  { id: '61', name: 'Duplicating and reusing guides', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'February 28, 2022' },
  { id: '62', name: 'Organizing content with tags', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'March 1, 2022' },
  { id: '63', name: 'Bulk content operations', type: 'guide', steps: 5, tags: '-', status: 'draft', lastEdited: 'March 2, 2022' },
  { id: '64', name: 'Setting up user segments', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'March 3, 2022' },
  { id: '65', name: 'Audience targeting rules', type: 'guide', steps: 7, tags: '-', status: 'published', lastEdited: 'March 4, 2022' },
  { id: '66', name: 'Triggering guides with events', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'March 5, 2022' },
  { id: '67', name: 'Scheduled guide publishing', type: 'guide', steps: 3, tags: '-', status: 'draft', lastEdited: 'March 6, 2022' },
  { id: '68', name: 'Feature adoption checklist', type: 'checklist', steps: 6, tags: '-', status: 'published', lastEdited: 'March 7, 2022' },
  { id: '69', name: 'New employee onboarding flow', type: 'checklist', steps: 10, tags: '-', status: 'published', lastEdited: 'March 8, 2022' },
  { id: '70', name: 'Customer success checklist', type: 'checklist', steps: 7, tags: '-', status: 'published', lastEdited: 'March 9, 2022' },
  { id: '71', name: 'Troubleshooting widget display issues', type: 'guide', steps: 8, tags: '-', status: 'published', lastEdited: 'March 10, 2022' },
  { id: '72', name: 'Fixing broken guide links', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'March 11, 2022' },
  { id: '73', name: 'Resolving embed conflicts', type: 'guide', steps: 5, tags: '-', status: 'draft', lastEdited: 'March 12, 2022' },
  { id: '74', name: 'Browser compatibility guide', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'March 13, 2022' },
  { id: '75', name: 'Mobile responsive design tips', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'March 14, 2022' },
  { id: '76', name: 'Accessibility best practices', type: 'guide', steps: 7, tags: '-', status: 'published', lastEdited: 'March 15, 2022' },
  { id: '77', name: 'Keyboard navigation support', type: 'guide', steps: 4, tags: '-', status: 'draft', lastEdited: 'March 16, 2022' },
  { id: '78', name: 'Screen reader compatibility', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'March 17, 2022' },
  { id: '79', name: 'Performance optimization tips', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'March 18, 2022' },
  { id: '80', name: 'Caching and CDN configuration', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'March 19, 2022' },
  { id: '81', name: 'Search configuration and tuning', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'March 20, 2022' },
  { id: '82', name: 'Adding a feedback widget', type: 'guide', steps: 3, tags: '-', status: 'published', lastEdited: 'March 21, 2022' },
  { id: '83', name: 'NPS survey setup', type: 'guide', steps: 4, tags: '-', status: 'draft', lastEdited: 'March 22, 2022' },
  { id: '84', name: 'CSAT collection workflow', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'March 23, 2022' },
  { id: '85', name: 'Creating decision trees', type: 'guide', steps: 8, tags: '-', status: 'published', lastEdited: 'March 24, 2022' },
  { id: '86', name: 'Interactive troubleshooter setup', type: 'guide', steps: 10, tags: '-', status: 'published', lastEdited: 'March 25, 2022' },
  { id: '87', name: 'Release note - January', type: 'guide', steps: 1, tags: '-', status: 'published', lastEdited: 'January 31, 2022' },
  { id: '88', name: 'Release note - December', type: 'guide', steps: 1, tags: '-', status: 'published', lastEdited: 'December 31, 2021' },
  { id: '89', name: 'Release note - November', type: 'guide', steps: 1, tags: '-', status: 'published', lastEdited: 'November 30, 2021' },
  { id: '90', name: 'Release note - March', type: 'guide', steps: 1, tags: '-', status: 'draft', lastEdited: 'March 26, 2022' },
  { id: '91', name: 'Contact form setup', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'March 27, 2022' },
  { id: '92', name: 'Live chat integration', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'March 28, 2022' },
  { id: '93', name: 'Chatbot flow builder', type: 'guide', steps: 9, tags: '-', status: 'draft', lastEdited: 'March 29, 2022' },
  { id: '94', name: 'Ticket escalation workflow', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'March 30, 2022' },
  { id: '95', name: 'SLA configuration guide', type: 'guide', steps: 4, tags: '-', status: 'published', lastEdited: 'March 31, 2022' },
  { id: '96', name: 'Agent training checklist', type: 'checklist', steps: 12, tags: '-', status: 'published', lastEdited: 'April 1, 2022' },
  { id: '97', name: 'Knowledge base migration guide', type: 'guide', steps: 8, tags: '-', status: 'published', lastEdited: 'April 2, 2022' },
  { id: '98', name: 'Importing content from Zendesk', type: 'guide', steps: 6, tags: '-', status: 'published', lastEdited: 'April 3, 2022' },
  { id: '99', name: 'Importing content from Confluence', type: 'guide', steps: 6, tags: '-', status: 'draft', lastEdited: 'April 4, 2022' },
  { id: '100', name: 'Backup and restore procedures', type: 'guide', steps: 5, tags: '-', status: 'published', lastEdited: 'April 5, 2022' },
];

const SUBFOLDER_SAMPLE_ITEMS = {
  'getting-started': [
    { name: 'Welcome to Stonly', type: 'guide', steps: 4, status: 'published', lastEdited: 'March 2, 2022' },
    { name: 'Account setup checklist', type: 'checklist', steps: 5, status: 'published', lastEdited: 'March 3, 2022' },
    { name: 'Your first guide', type: 'guide', steps: 3, status: 'draft', lastEdited: 'March 4, 2022' },
  ],
  'account-team': [
    { name: 'Inviting teammates', type: 'guide', steps: 3, status: 'published', lastEdited: 'February 12, 2022' },
    { name: 'Roles and permissions', type: 'guide', steps: 6, status: 'published', lastEdited: 'February 14, 2022' },
  ],
  settings: [
    { name: 'Workspace preferences', type: 'guide', steps: 4, status: 'draft', lastEdited: 'January 20, 2022' },
    { name: 'Notification settings', type: 'guide', steps: 2, status: 'published', lastEdited: 'January 22, 2022' },
  ],
  'billing-plans': [
    { name: 'Understanding your invoice', type: 'guide', steps: 3, status: 'published', lastEdited: 'February 1, 2022' },
    { name: 'Upgrade checklist', type: 'checklist', steps: 4, status: 'draft', lastEdited: 'February 3, 2022' },
  ],
  integrations: [
    { name: 'Connecting Slack', type: 'guide', steps: 5, status: 'published', lastEdited: 'January 10, 2022' },
    { name: 'Zapier setup guide', type: 'guide', steps: 6, status: 'published', lastEdited: 'January 15, 2022' },
  ],
  troubleshooting: [
    { name: 'Common login issues', type: 'guide', steps: 3, status: 'published', lastEdited: 'December 5, 2021' },
    { name: 'Widget not loading', type: 'guide', steps: 4, status: 'draft', lastEdited: 'December 8, 2021' },
  ],
  'security-privacy': [
    { name: 'Two-factor setup', type: 'guide', steps: 4, status: 'published', lastEdited: 'November 2, 2021' },
    { name: 'Data retention policy', type: 'guide', steps: 2, status: 'published', lastEdited: 'November 5, 2021' },
  ],
  'api-reference': [
    { name: 'Authentication guide', type: 'guide', steps: 3, status: 'published', lastEdited: 'October 1, 2021' },
    { name: 'Rate limits explained', type: 'guide', steps: 2, status: 'draft', lastEdited: 'October 3, 2021' },
  ],
  'analytics-reports': [
    { name: 'Reading your dashboard', type: 'guide', steps: 4, status: 'published', lastEdited: 'September 12, 2021' },
    { name: 'Exporting reports', type: 'guide', steps: 3, status: 'draft', lastEdited: 'September 15, 2021' },
  ],
  customization: [
    { name: 'Custom theming', type: 'guide', steps: 5, status: 'published', lastEdited: 'August 20, 2021' },
    { name: 'Custom CSS guide', type: 'guide', steps: 4, status: 'draft', lastEdited: 'August 22, 2021' },
  ],
  'release-notes': [
    { name: 'v2.4 release notes', type: 'guide', steps: 1, status: 'published', lastEdited: 'July 1, 2021' },
    { name: 'v2.3 release notes', type: 'guide', steps: 1, status: 'published', lastEdited: 'June 1, 2021' },
  ],
  internal: [{ name: 'Internal onboarding', type: 'guide', steps: 5, status: 'draft', lastEdited: 'May 1, 2021' }],
  compliance: [
    { name: 'SOC 2 checklist', type: 'checklist', steps: 6, status: 'published', lastEdited: 'April 1, 2021' },
    { name: 'GDPR overview', type: 'guide', steps: 3, status: 'published', lastEdited: 'April 3, 2021' },
  ],
  'team-policies': [
    { name: 'Remote work policy', type: 'guide', steps: 2, status: 'published', lastEdited: 'March 10, 2021' },
    { name: 'Code of conduct', type: 'guide', steps: 1, status: 'published', lastEdited: 'March 12, 2021' },
  ],
};

let sampleItemCounter = 0;
const SUBFOLDER_CONTENT_ITEMS = Object.entries(SUBFOLDER_SAMPLE_ITEMS).flatMap(([folderId, items]) =>
  items.map((item) => {
    sampleItemCounter += 1;
    return { id: `sample-${sampleItemCounter}`, folderId, tags: '-', ...item };
  })
);

const INITIAL_CONTENT_ITEMS = [
  ...HELP_CENTER_ITEMS.map((item) => ({ ...item, folderId: 'help-center' })),
  ...SUBFOLDER_CONTENT_ITEMS,
];

const FAIL_REASONS = [
  'Insufficient permissions',
  'Item no longer exists',
  'Item is locked',
  'Unable to delete',
];

function findFolderPath(node, targetId, path = []) {
  const nextPath = [...path, { id: node.id, name: node.name }];
  if (node.id === targetId) return nextPath;
  for (const child of node.children || []) {
    const found = findFolderPath(child, targetId, nextPath);
    if (found) return found;
  }
  return null;
}

function App() {
  const [contentItems, setContentItems] = useState(INITIAL_CONTENT_ITEMS);
  const [deletedItems, setDeletedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [currentPath, setCurrentPath] = useState([
    { id: 'stonly-home', name: 'Stonly Home' },
    { id: 'help-center', name: 'Help center' },
  ]);
  const [activeFolderId, setActiveFolderId] = useState('help-center');
  const [currentView, setCurrentView] = useState('content');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
  const [activeOperation, setActiveOperation] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [toastDismissed, setToastDismissed] = useState(false);
  const [showFolderPicker, setShowFolderPicker] = useState(false);
  const [folderPickerMode, setFolderPickerMode] = useState('restore');
  const [restoreItemIds, setRestoreItemIds] = useState([]);
  const [simpleToastMessage, setSimpleToastMessage] = useState(null);
  const [shallowCopyItem, setShallowCopyItem] = useState(null);
  const [shallowCopyToastMessage, setShallowCopyToastMessage] = useState(null);
  const [occurrencesByItemId, setOccurrencesByItemId] = useState({});
  const [activeOccurrencesItemId, setActiveOccurrencesItemId] = useState(null);
  const [showOccurrencesPanel, setShowOccurrencesPanel] = useState(false);
  const [openShallowCopyItem, setOpenShallowCopyItem] = useState(null);
  const [scrollToItemId, setScrollToItemId] = useState(null);

  const movedItemIds = useRef(new Set());

  // --- Async delete processing ---
  useEffect(() => {
    if (!activeOperation || activeOperation.complete) return;

    if (activeOperation.aborting) {
      const timer = setTimeout(() => {
        setActiveOperation((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            items: prev.items.map((i) =>
              i.status === 'pending' || i.status === 'in_progress'
                ? { ...i, status: 'cancelled' }
                : i
            ),
            complete: true,
            aborted: true,
            aborting: false,
          };
        });
      }, 800);
      return () => clearTimeout(timer);
    }

    const hasInProgress = activeOperation.items.some(
      (i) => i.status === 'in_progress'
    );
    const delay = hasInProgress ? 300 + Math.random() * 300 : 150;

    const timer = setTimeout(() => {
      setActiveOperation((prev) => {
        if (!prev || prev.complete || prev.aborting) return prev;
        const items = prev.items.map((i) => ({ ...i }));

        const ipItem = items.find((i) => i.status === 'in_progress');
        if (ipItem) {
          const failed = Math.random() < 0.15;
          ipItem.status = failed ? 'failed' : 'completed';
          ipItem.failReason = failed
            ? FAIL_REASONS[Math.floor(Math.random() * FAIL_REASONS.length)]
            : null;
        }

        const nextItem = items.find((i) => i.status === 'pending');
        if (nextItem) {
          nextItem.status = 'in_progress';
        }

        const allDone = !items.some(
          (i) => i.status === 'pending' || i.status === 'in_progress'
        );
        return { ...prev, items, complete: allDone };
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [activeOperation]);

  // --- Move each item out of the list as it individually completes ---
  useEffect(() => {
    if (!activeOperation) {
      movedItemIds.current = new Set();
      return;
    }

    const newlyCompleted = activeOperation.items.filter(
      (i) => i.status === 'completed' && !movedItemIds.current.has(i.id)
    );
    if (newlyCompleted.length === 0) return;

    newlyCompleted.forEach((i) => movedItemIds.current.add(i.id));

    const sourceIdsToRemove = new Set(
      newlyCompleted.map((i) => i.sourceId).filter(Boolean)
    );
    if (sourceIdsToRemove.size > 0) {
      setContentItems((prev) => prev.filter((i) => !sourceIdsToRemove.has(i.id)));
    }

    const now = new Date();
    const guidesForRecycle = newlyCompleted.filter((i) => i.type !== 'folder');
    if (guidesForRecycle.length > 0) {
      setDeletedItems((prev) => [
        ...guidesForRecycle.map((opItem) => ({
          id: opItem.isSynthetic
            ? `del-${opItem.id}-${Date.now()}`
            : opItem.sourceId,
          name: opItem.name,
          type: 'guide',
          tags: '-',
          status: opItem.originalStatus || 'draft',
          steps: opItem.steps || Math.floor(Math.random() * 5) + 1,
          lastEdited: opItem.lastEdited || 'Unknown',
          deletedDate: now.toISOString(),
          daysRemaining: 14,
          originalPath: opItem.path || 'Help center',
        })),
        ...prev,
      ]);
    }
  }, [activeOperation]);

  // --- Selection ---
  const handleToggleSelect = useCallback(
    (id) => {
      const processingSourceIds = new Set(
        (activeOperation?.items || [])
          .filter(
            (i) =>
              i.status === 'pending' ||
              i.status === 'in_progress'
          )
          .map((i) => i.sourceId)
          .filter(Boolean)
      );
      if (processingSourceIds.has(id)) return;

      setSelectedItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [activeOperation]
  );

  const handleSelectAll = useCallback(() => {
    const items =
      currentView === 'recentlyDeleted'
        ? deletedItems
        : contentItems.filter((i) => i.folderId === activeFolderId);
    const processingSourceIds = new Set(
      (activeOperation?.items || [])
        .filter(
          (i) =>
            i.status === 'pending' ||
            i.status === 'in_progress'
        )
        .map((i) => i.sourceId)
        .filter(Boolean)
    );
    const selectableItems = items.filter(
      (i) => !processingSourceIds.has(i.id)
    );

    if (selectedItems.size === selectableItems.length && selectableItems.length > 0) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(selectableItems.map((i) => i.id)));
    }
  }, [
    selectedItems.size,
    contentItems,
    deletedItems,
    currentView,
    activeOperation,
    activeFolderId,
  ]);

  const handleClearSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  // --- Navigation ---
  const navigateToFolder = useCallback((folderId) => {
    setActiveFolderId(folderId);
    setCurrentPath(findFolderPath(FOLDER_TREE_DATA, folderId) || [{ id: 'stonly-home', name: 'Stonly Home' }]);
    setSelectedItems(new Set());
  }, []);

  const handleFolderClick = useCallback(
    (item) => {
      if (item.type === 'folder' || item.type === 'root') {
        navigateToFolder(item.id);
      }
    },
    [navigateToFolder]
  );

  const handleBreadcrumbClick = useCallback(
    (index) => {
      const target = currentPath[index];
      if (target) navigateToFolder(target.id);
    },
    [currentPath, navigateToFolder]
  );

  const handleTreeNodeClick = useCallback(
    (nodeId) => {
      navigateToFolder(nodeId);
    },
    [navigateToFolder]
  );

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
    setSelectedItems(new Set());
  }, []);

  // --- Delete flow ---
  const handleDelete = useCallback(() => {
    if (selectedItems.size === 0) return;
    setPendingDeleteIds([...selectedItems]);
    setShowDeleteConfirm(true);
  }, [selectedItems]);

  const handleRowDelete = useCallback((item) => {
    setPendingDeleteIds([item.id]);
    setShowDeleteConfirm(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(false);

    const currentPathStr = currentPath.map((p) => p.name).join(' / ');
    const operationItems = [];

    pendingDeleteIds.forEach((id) => {
      const item = contentItems.find((i) => i.id === id);
      if (!item) return;

      operationItems.push({
        id: `op-${item.id}`,
        sourceId: item.id,
        name: item.name,
        type: item.type,
        path: currentPathStr,
        status: 'pending',
        failReason: null,
        originalStatus: item.status,
        steps: item.steps,
        lastEdited: item.lastEdited,
      });

      if (item.type === 'folder' && item.guides > 0) {
        for (let i = 0; i < item.guides; i++) {
          operationItems.push({
            id: `op-${item.id}-child-${i}`,
            sourceId: null,
            name: `Guide ${i + 1}`,
            type: 'guide',
            path: `${currentPathStr} / ${item.name}`,
            status: 'pending',
            failReason: null,
            isSynthetic: true,
          });
        }
      }
    });

    setActiveOperation({
      type: 'delete',
      items: operationItems,
      complete: false,
      aborting: false,
      aborted: false,
    });
    setToastDismissed(false);
    setSelectedItems(new Set());
    setPendingDeleteIds([]);
  }, [pendingDeleteIds, contentItems, currentPath]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteConfirm(false);
    setPendingDeleteIds([]);
  }, []);

  // --- Abort ---
  const handleAbort = useCallback(() => {
    setActiveOperation((prev) =>
      prev ? { ...prev, aborting: true } : null
    );
  }, []);

  // --- Toast ---
  const handleToastDismiss = useCallback(() => {
    setToastDismissed(true);
    if (activeOperation?.complete) {
      const hasErrors = activeOperation.items.some(
        (i) => i.status === 'failed'
      );
      if (!hasErrors && !showDetailsPopup) {
        setActiveOperation(null);
      }
    }
  }, [activeOperation, showDetailsPopup]);

  // --- Details popup ---
  const handleOpenDetails = useCallback(() => {
    setShowDetailsPopup(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetailsPopup(false);
  }, []);

  const handleRetryItem = useCallback((itemId) => {
    setActiveOperation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        items: prev.items.map((i) =>
          i.id === itemId
            ? { ...i, status: 'pending', failReason: null }
            : i
        ),
        complete: false,
      };
    });
    setToastDismissed(false);
  }, []);

  const handleRetryAll = useCallback(() => {
    setActiveOperation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        items: prev.items.map((i) =>
          i.status === 'failed'
            ? { ...i, status: 'pending', failReason: null }
            : i
        ),
        complete: false,
      };
    });
    setToastDismissed(false);
  }, []);

  const handleClearOperation = useCallback(() => {
    setActiveOperation(null);
    setToastDismissed(false);
    setShowDetailsPopup(false);
  }, []);

  // --- Restore flow ---
  const handleRestore = useCallback(() => {
    if (selectedItems.size === 0) return;
    setFolderPickerMode('restore');
    setRestoreItemIds([...selectedItems]);
    setShowFolderPicker(true);
  }, [selectedItems]);

  const handleRestoreSingle = useCallback((itemId) => {
    setFolderPickerMode('restore');
    setRestoreItemIds([itemId]);
    setShowFolderPicker(true);
  }, []);

  // --- Move to... flow (row dropdown) ---
  const handleRowMoveTo = useCallback((item) => {
    setFolderPickerMode('move');
    setRestoreItemIds([item.id]);
    setShowFolderPicker(true);
  }, []);

  const handleFolderPickerConfirm = useCallback(
    (folderId, folderName) => {
      setShowFolderPicker(false);

      if (folderPickerMode === 'move') {
        setRestoreItemIds([]);
        setSimpleToastMessage(`Moved to ${folderName}`);
        return;
      }

      const idsToRestore = new Set(restoreItemIds);
      const restoredItems = deletedItems
        .filter((i) => idsToRestore.has(i.id))
        .map(({ deletedDate, daysRemaining, originalPath, ...item }) => ({
          ...item,
          lastEdited: 'Just now',
        }));

      setContentItems((prev) => [...prev, ...restoredItems]);
      setDeletedItems((prev) => prev.filter((i) => !idsToRestore.has(i.id)));
      setSelectedItems(new Set());
      setRestoreItemIds([]);
    },
    [folderPickerMode, restoreItemIds, deletedItems]
  );

  const handleFolderPickerCancel = useCallback(() => {
    setShowFolderPicker(false);
    setRestoreItemIds([]);
  }, []);

  // --- Row dropdown actions ---
  const handleRowDuplicate = useCallback((item) => {
    setSimpleToastMessage(`"${item.name}" duplicated`);
  }, []);

  const handleRowCreateShallowCopy = useCallback((item) => {
    setShallowCopyItem(item);
  }, []);

  const handleCreateShallowCopyConfirm = useCallback(
    (selectedLocations) => {
      const sourceItem = shallowCopyItem;
      const count = selectedLocations.length;
      const timestamp = Date.now();

      const newItems = selectedLocations.map((location, index) => ({
        id: `shallow-copy-${sourceItem.id}-${timestamp}-${index}`,
        folderId: location.id,
        name: sourceItem.name,
        type: sourceItem.type,
        steps: sourceItem.steps,
        tags: '-',
        status: 'draft',
        lastEdited: 'A moment ago',
        isShallowCopy: true,
        sourceItemId: sourceItem.id,
      }));

      setContentItems((prev) => [...newItems, ...prev]);
      setShallowCopyToastMessage(`${count} shallow copies were created successfully.`);
      setOccurrencesByItemId((prev) => ({
        ...prev,
        [sourceItem.id]: [
          ...(prev[sourceItem.id] || []),
          ...newItems.map((item, index) => ({
            id: item.id,
            name: item.name,
            path: selectedLocations[index].path,
            folderId: item.folderId,
            isShallowCopy: true,
          })),
        ],
      }));
      setActiveOccurrencesItemId(sourceItem.id);
      setShallowCopyItem(null);
    },
    [shallowCopyItem]
  );

  const handleCreateShallowCopyCancel = useCallback(() => {
    setShallowCopyItem(null);
  }, []);

  const handleViewShallowCopyLocation = useCallback(() => {
    setShowOccurrencesPanel(true);
  }, []);

  const handleCloseOccurrencesPanel = useCallback(() => {
    setShowOccurrencesPanel(false);
  }, []);

  const handleOpenOccurrence = useCallback(
    (occurrence) => {
      navigateToFolder(occurrence.folderId);
      setCurrentView('content');
      setShowOccurrencesPanel(false);
      setScrollToItemId(occurrence.id);
    },
    [navigateToFolder]
  );

  const handleScrollToItemHandled = useCallback(() => {
    setScrollToItemId(null);
  }, []);

  const handleOpenShallowCopy = useCallback((item) => {
    setOpenShallowCopyItem(item);
  }, []);

  const handleCloseShallowCopyDialog = useCallback(() => {
    setOpenShallowCopyItem(null);
  }, []);

  const handleOpenOriginalGuide = useCallback(() => {
    const sourceItem = contentItems.find((i) => i.id === openShallowCopyItem?.sourceItemId);
    setOpenShallowCopyItem(null);
    if (sourceItem) {
      navigateToFolder(sourceItem.folderId);
      setCurrentView('content');
      setScrollToItemId(sourceItem.id);
    }
  }, [contentItems, openShallowCopyItem, navigateToFolder]);

  const handleShallowCopyToastDismiss = useCallback(() => {
    setShallowCopyToastMessage(null);
  }, []);

  const handleRowPreview = useCallback((item) => {
    console.log('TODO: Preview', item);
  }, []);

  const handleRowEditRights = useCallback((item) => {
    console.log('TODO: Edit rights', item);
  }, []);

  const handleRowViewOccurrences = useCallback((item) => {
    setActiveOccurrencesItemId(item.id);
    setShowOccurrencesPanel(true);
  }, []);

  const handleRowSettings = useCallback((item) => {
    console.log('TODO: Settings', item);
  }, []);

  const handleSimpleToastDismiss = useCallback(() => {
    setSimpleToastMessage(null);
  }, []);

  // --- Computed values ---
  const operationStatusMap = new Map();
  (activeOperation?.items || []).forEach((i) => {
    if (i.sourceId && (i.status === 'pending' || i.status === 'in_progress')) {
      operationStatusMap.set(i.sourceId, i.status);
    }
  });
  const processingIds = new Set(operationStatusMap.keys());

  const isOperationActive = !!(activeOperation && !activeOperation.complete);
  const hasFailedItems = !!(
    activeOperation?.items.some((i) => i.status === 'failed')
  );
  const showSpinner = !!(activeOperation && !activeOperation.complete);
  const showToast = !!(activeOperation && !toastDismissed);

  const visibleContentItems = contentItems.filter((i) => i.folderId === activeFolderId);

  const pendingDeleteSet = new Set(pendingDeleteIds);
  const selectedFolders = contentItems.filter(
    (i) => i.type === 'folder' && pendingDeleteSet.has(i.id)
  );
  const selectedGuidesCount = contentItems.filter(
    (i) => i.type !== 'folder' && pendingDeleteSet.has(i.id)
  ).length;
  const folderGuidesCount = selectedFolders.reduce(
    (sum, f) => sum + (f.guides || 0),
    0
  );

  return (
    <div className="app">
      <AppHeader />
      <div className="app-body">
        <SideNav currentView={currentView} onViewChange={handleViewChange} />
        {currentView === 'content' && (
          <FolderTree
            data={FOLDER_TREE_DATA}
            activeFolderId={activeFolderId}
            onNodeClick={handleTreeNodeClick}
          />
        )}
        {currentView === 'content' ? (
          <ContentArea
            items={visibleContentItems}
            breadcrumb={currentPath}
            selectedItems={selectedItems}
            processingIds={processingIds}
            operationStatusMap={operationStatusMap}
            isOperationActive={isOperationActive}
            showSpinner={showSpinner}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onFolderClick={handleFolderClick}
            onOpenShallowCopy={handleOpenShallowCopy}
            onBreadcrumbClick={handleBreadcrumbClick}
            onDelete={handleDelete}
            onOpenDetails={handleOpenDetails}
            onRowPreview={handleRowPreview}
            onRowEditRights={handleRowEditRights}
            onRowMoveTo={handleRowMoveTo}
            onRowDuplicate={handleRowDuplicate}
            onRowCreateShallowCopy={handleRowCreateShallowCopy}
            onRowViewOccurrences={handleRowViewOccurrences}
            onRowSettings={handleRowSettings}
            onRowDelete={handleRowDelete}
            scrollToItemId={scrollToItemId}
            onScrollToItemHandled={handleScrollToItemHandled}
          />
        ) : (
          <RecentlyDeletedView
            items={deletedItems}
            selectedItems={selectedItems}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onRestore={handleRestore}
            onRestoreSingle={handleRestoreSingle}
          />
        )}
      </div>
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          itemCount={pendingDeleteIds.length}
          selectedFolders={selectedFolders}
          guidesCount={selectedGuidesCount}
          folderGuidesCount={folderGuidesCount}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {showToast && (
        <Toast
          activeOperation={activeOperation}
          onAbort={handleAbort}
          onDismiss={handleToastDismiss}
          onSeeDetails={handleOpenDetails}
          detailsOpen={showDetailsPopup}
        />
      )}
      {!showToast && simpleToastMessage && (
        <Toast message={simpleToastMessage} onDismiss={handleSimpleToastDismiss} />
      )}
      {!showToast && !simpleToastMessage && shallowCopyToastMessage && (
        <ShallowCopyToast
          message={shallowCopyToastMessage}
          actionLabel="View occurrences"
          onActionClick={handleViewShallowCopyLocation}
          onDismiss={handleShallowCopyToastDismiss}
        />
      )}
      {showOccurrencesPanel && (
        <ViewOccurrencesPanel
          occurrences={occurrencesByItemId[activeOccurrencesItemId] || []}
          onOpen={handleOpenOccurrence}
          onClose={handleCloseOccurrencesPanel}
        />
      )}
      {shallowCopyItem && (
        <>
          <ShallowCopyInfoBar itemName={shallowCopyItem.name} />
          <CreateShallowCopyModal
            treeData={FOLDER_TREE_DATA}
            onConfirm={handleCreateShallowCopyConfirm}
            onCancel={handleCreateShallowCopyCancel}
          />
        </>
      )}
      {openShallowCopyItem && (
        <ShallowCopyRestrictedModal
          item={openShallowCopyItem}
          breadcrumb={(findFolderPath(FOLDER_TREE_DATA, openShallowCopyItem.folderId) || [])
            .map((p) => p.name)
            .join(' > ')}
          onOpenOriginal={handleOpenOriginalGuide}
          onClose={handleCloseShallowCopyDialog}
        />
      )}
      {showDetailsPopup && activeOperation && (
        <DetailsPopup
          operation={activeOperation}
          onClose={handleCloseDetails}
          onRetryItem={handleRetryItem}
          onRetryAll={handleRetryAll}
          onClearOperation={handleClearOperation}
        />
      )}
      {showFolderPicker && (
        <FolderPickerModal
          treeData={FOLDER_TREE_DATA}
          itemCount={restoreItemIds.length}
          mode={folderPickerMode}
          onConfirm={handleFolderPickerConfirm}
          onCancel={handleFolderPickerCancel}
        />
      )}
    </div>
  );
}

export default App;
