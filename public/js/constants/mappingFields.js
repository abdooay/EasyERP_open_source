'use strict';
define([
    'Backbone',
    'models/journalEntry',
    'custom',
    'moment'
], function (Backbone, journalEntryModel, Custom, moment) {
    var mappingFields = {
        Quotation: {
            'currency._id': 'Currency ID',
            'currency.rate': 'Currency rate',
            'forSales': 'For sales',
            'type': 'Type',
            'isOrder': 'Is order',
            'supplier': 'Supplier',
            'project': 'Project name',
            'deliverTo': 'Deliver to',
            'orderDate': 'Order date',
            'expectedDate': 'Expected date',
            'name': 'Name',
            'destination': 'Destination',
            'incoterm': 'Incoterm',
            'invoiceControl': 'Invoice control',
            'invoiceRecived': 'Invoice recived',
            'paymentTerm': 'Payment term',
            'paymentInfo': 'Payment info',
            'products': 'Products',
            'workflow': 'Workflow',
            'whoCanRW': 'Editor',
            'attachments': 'Attachments',
            'groups.owner': 'Owner',
            'groups.users': 'Users',
            'groups.group': 'Group',
            'creationDate': 'Creation date',
            'createdBy.date': 'Created by date',
            'createdBy.user': 'Created by user',
            'editedBy.user': 'Edited bt date',
            'editedBy.date': 'Edited by user',
            'proformaCounter': 'Proforma counter',
            'reason': 'Reason',
            '': ''
        },
        Invoice      : {
            'ID'                    : 'Id',
            'forSales'              : 'ForSales',
            'supplier._id'          : 'Supplier ID',
            'supplier.name'         : 'Supplier Name',
            'sourceDocument'        : 'Source Document',
            'supplierInvoiceNumberr': 'Supplier Invoice Number',
            'paymentReference'      : 'Payment Reference',
            'invoiceDate'           : 'Invoice Date',
            'dueDate'               : 'Due Date',
            'paymentDate'           : 'Payment Date',
            'account'               : 'Account',
            'journal'               : 'Journal',
            'salesPerson._id'       : 'Sales Person ID',
            'salesPerson.name'      : 'Sales Person Name',
            'paymentTerms'          : 'Payment Term',
            'paymentInfo'           : 'Payment Info',
            'payments'              : 'Payment',
            'products'              : 'Products',
            'workflow._id'          : 'Workflow Id',
            'workflow.name'         : 'Workflow Name',
            'workflow.status'       : 'Workflow Status',
            'whoCanRW'              : 'Who Can RW',
            'groups.owner'          : 'Groups Owner',
            'groups.users'          : 'Groups Users',
            'groups.group'          : 'Groups Group',
            'creationDate'          : 'Creation Date',
            'createdBy.user'        : 'Created By User',
            'createdBy.date'        : 'Created By Date',
            'editedBy.user'         : 'Edited By User',
            'editedBy.date'         : 'Edited By Date',
            ''                      : ''
        },
        Customers    : {
            'type'                          : 'Type',
            'isOwn'                         : 'Is our own company',
            'name.first'                    : 'First name',
            'name.last'                     : 'Last name',
            'dateBirth'                     : 'Date of birth',
            'imageSrc'                      : 'Base64 encoded image',
            'email'                         : 'Email',
            'company'                       : 'Company name',
            'department'                    : 'Department',
            'timezone'                      : 'Time zone',
            'address.street'                : 'Street',
            'address.city'                  : 'City',
            'address.state'                 : 'State',
            'address.zip'                   : 'Zip code',
            'address.country'               : 'Country',
            'website'                       : 'Website',
            'jobPosition'                   : 'Job Position',
            'skype'                         : 'Skype',
            'phones.phone'                  : 'Phone',
            'phones.mobile'                 : 'Mobile phone',
            'phones.fax'                    : 'Fax',
            'contacts'                      : 'Contacts',
            'internalNotes'                 : 'Notes',
            'title'                         : 'Title',
            'salesPurchases.isCustomer'     : 'Customer',
            'salesPurchases.isSupplier'     : 'Supplier',
            'salesPurchases.salesPerson'    : 'Sales Person',
            'salesPurchases.salesTeam'      : 'Sales Team',
            'salesPurchases.implementedBy'  : 'Implemented by',
            'salesPurchases.active'         : 'Purchase active',
            'salesPurchases.reference'      : 'Purchase reference',
            'salesPurchases.language'       : 'Purchase language',
            'salesPurchases.receiveMessages': 'Messages',
            'relatedUser'                   : 'Related user',
            'color'                         : 'Color',
            'social.FB'                     : 'Facebook',
            'social.LI'                     : 'LinkedIn',
            'whoCanRW'                      : 'Editor',
            'groups.owner'                  : 'Owner',
            'groups.users'                  : 'Users',
            'groups.group'                  : 'Group',
            'notes'                         : 'Notes',
            'attachments'                   : 'Attachments',
            'history'                       : 'History',
            'createdBy.user'                : 'Created by',
            'createdBy.date'                : 'Created date',
            'editedBy.user'                 : 'Edited by',
            'editedBy.date'                 : 'Edited date',
            'companyInfo.size'              : 'Company size',
            'companyInfo.industry'          : 'Company industry',
            'ID'                            : 'ID',
            'reason'                        : 'Reason',
            ''                              : ''
        },
        Employees    : {
            'isEmployee'         : 'Employee',
            'imageSrc'           : 'Image',
            'subject'            : 'Subject',
            'name.first'         : 'First name',
            'name.last'          : 'Last name',
            'tags'               : 'Tags',
            'workAddress.street' : 'Work Street',
            'workAddress.city'   : 'Work City',
            'workAddress.state'  : 'Work State',
            'workAddress.zip'    : 'Work Zip code',
            'workAddress.country': 'Work Country',
            'workEmail'          : 'Email corporate',
            'personalEmail'      : 'Email personal',
            'workPhones.mobile'  : 'Mobile phone',
            'workPhones.phone'   : 'Phone',
            'skype'              : 'Skype',
            'officeLocation'     : 'Location',
            'relatedUser'        : 'Related user',
            'visibility'         : 'Visibility',
            'department.name'    : 'Department',
            'department._id'     : 'Department ID',
            'jobPosition._id'    : 'Job position ID',
            'jobPosition.name'   : 'Job Position',
            'manager.name'       : 'Manager',
            'manager._id'        : 'Manager ID',
            'coach'              : 'Supervisor',
            'nationality'        : 'Nationality',
            'identNo'            : 'ID',
            'passportNo'         : 'Passport number',
            'bankAccountNo'      : 'Bank account',
            'otherId'            : 'Other ID',
            'homeAddress.street' : 'Home Street',
            'homeAddress.city'   : 'Home City',
            'homeAddress.state'  : 'Home State',
            'homeAddress.zip'    : 'Home Zip code',
            'homeAddress.country': 'Home country',
            'age'                : 'Age',
            'daysForBirth'       : 'Birth date',
            'nextAction'         : 'Next action',
            'source'             : 'Source',
            'referredBy'         : 'Reference',
            'workflow'           : 'Workflow',
            'whoCanRW'           : 'Editor',
            'groups.owner'       : 'Owner',
            'groups.users'       : 'Users',
            'groups.group'       : 'Group',
            'otherInfo'          : 'Other Info',
            'expectedSalary'     : 'Salary Expected',
            'proposedSalary'     : 'Salary proposed',
            'color'              : 'Color',
            'creationDate'       : 'Creation date',
            'createdBy.user'     : 'Created by',
            'createdBy.date'     : 'Created date',
            'editedBy.user'      : 'Edited by',
            'editedBy.date'      : 'Edited date',
            'attachments'        : 'Attachments',
            'marital'            : 'Family status',
            'gender'             : 'Gender',
            'jobType'            : 'Job',
            'sequence'           : 'Sequence',
            'isLead'             : 'Lead',
            'ID'                 : 'ID',
            'social.FB'          : 'Facebook',
            'social.LI'          : 'LinkedIn',
            'social.GP'          : 'Google Plus',
            'hire'               : 'Hired',
            'fire'               : 'Fired',
            'lastFire'           : 'Last fire dates',
            'transferred'        : 'Trannsferred',
            'reason'             : 'Reason',
            ''                   : ''
        },
        Opportunities: {
            'isOpportunitie'          : 'Opportunity',
            'jobkey'                  : 'Job',
            'name'                    : 'Full Name',
            'expectedRevenue.value'   : 'Value',
            'expectedRevenue.progress': 'Progress',
            'expectedRevenue.currency': 'Currency',
            'creationDate'            : 'Creation date',
            'tempCompanyField'        : 'Company field',
            'company'                 : 'Company',
            'customer'                : 'Customer',
            'tags'                    : 'Tags',
            'address.street'          : 'Street',
            'address.city'            : 'City',
            'address.state'           : 'State',
            'address.zip'             : 'Zip code',
            'address.country'         : 'Country',
            'contacts'                : 'Contacts',
            'contactName.first'       : 'First Name',
            'contactName.last'        : 'Last Name',
            'email'                   : 'Email',
            'phones.mobile'           : 'Mobile phone',
            'phones.phone'            : 'Phone',
            'phones.fax'              : 'Fax',
            'func'                    : 'Position',
            'salesPerson'             : 'Sales person',
            'salesTeam'               : 'Sales team',
            'internalNotes'           : 'Notes',
            'nextAction.desc'         : 'Next action',
            'nextAction.date'         : 'Next action date',
            'expectedClosing'         : 'Closing',
            'priority'                : 'Priority',
            'categories.id'           : 'Category ID',
            'categories.name'         : 'Category name',
            'color'                   : 'Color',
            'active'                  : 'Active',
            'optout'                  : 'Optout',
            'reffered'                : 'Reference',
            'workflow'                : 'Workflow',
            'whoCanRW'                : 'Editor',
            'groups.owner'            : 'Owner',
            'groups.users'            : 'Users',
            'groups.group'            : 'Group',
            'sequence'                : 'Sequence',
            'createdBy.user'          : 'Created by',
            'createdBy.date'          : 'Created date',
            'editedBy.user'           : 'Edited by',
            'editedBy.date'           : 'Edited date',
            'campaign'                : 'Campaign',
            'source'                  : 'Source',
            'isConverted'             : 'Converted',
            'convertedDate'           : 'Converted date',
            'notes.note'              : 'Note',
            'notes.title'             : 'Title',
            'notes.task'              : 'Note task',
            'notes.attachment'        : 'Note attachment',
            'notes.date'              : 'Note date',
            'notes.user._id'          : 'Note user ID',
            'notes.user.login'        : 'Note user',
            'attachments'             : 'Attachments',
            'projectType'             : 'Project type',
            'social.FB'               : 'Facebook',
            'social.LI'               : 'LinkedIn',
            'skype'                   : 'Skype',
            'reason'                  : 'Reason',
            ''                        : ''
        }
    };

    return mappingFields;
});