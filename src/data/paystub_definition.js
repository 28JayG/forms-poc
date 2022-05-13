export const PAYSTUB_DEFINITION = {
  document_type: 'paystub',
  document_id: '55149128-9371-4e7c-af3c-abf0a622a9f4',
  document_name: 'Paystub',
  default_queue: 'income',
  extracted_data: {
    FirstName: {
      datatype: 'string',
      label: 'First Name',
      required: true,
    },
    MiddleName: {
      datatype: 'string',
      label: 'Middle Name',
      required: false,
    },
    LastName: {
      datatype: 'string',
      label: 'Last Name',
      required: true,
    },
    Suffix: {
      datatype: 'string',
      label: 'Suffix',
      required: false,
    },

    Address: {
      StreetAddress: {
        datatype: 'string',
        label: 'Street Address',
        required: true,
      },
      Street2: {
        datatype: 'string',
        label: 'Street Line 2',
        required: false,
      },
      City: {
        datatype: 'string',
        label: 'City',
        required: true,
      },
      State: {
        datatype: 'string',
        label: 'State',
        required: true,
      },
      Zip: {
        datatype: 'integer',
        label: 'Zip',
        required: true,
      },
    },

    EmployerName: {
      datatype: 'string',
      label: 'Employer Name',
      required: true,
    },
    PayBeginDate: {
      datatype: 'date',
      label: 'Pay Begin Date',
      required: true,
    },
    PayEndDate: {
      datatype: 'date',
      label: 'Pay End Date',
      required: true,
    },
    PayDate: {
      datatype: 'date',
      label: 'Pay Date',
      required: true,
    },

    RegularPay: {
      Current: {
        datatype: 'float',
        label: 'Current Regular Pay',
        required: true,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Regular Pay',
        required: true,
      },
    },
    
    GrossPay: {
      Current: {
        datatype: 'float',
        label: 'Current Gross Pay',
        required: true,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Gross Pay',
        required: true,
      },
    },

    OvertimePay: {
      Current: {
        datatype: 'float',
        label: 'Current Overtime Pay',
        required: false,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Overtime Pay',
        required: false,
      },
    },

    Garnishments: {
      Current: {
        datatype: 'float',
        label: 'Current Garnishments',
        required: false,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Garnishments',
        required: false,
      },
    },

    Loans401K: {
      Current: {
        datatype: 'float',
        label: 'Current Loans/401K',
        required: false,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Loans/401K',
        required: false,
      },
    },

    BonusPay: {
      Current: {
        datatype: 'float',
        label: 'Current Bonus Pay',
        required: false,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Bonus Pay',
        required: false,
      },
    },

    CommissionPay: {
      Current: {
        datatype: 'float',
        label: 'Current Commission Pay',
        required: false,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Commission Pay',
        required: false,
      },
    },

    TipsPay: {
      Current: {
        datatype: 'float',
        label: 'Current Tips Pay',
        required: false,
      },
      Ytd: {
        datatype: 'float',
        label: ' YTD Tips Pay',
        required: false,
      },
    },
    
    PayPeriodFrequency: {
      datatype: 'select',
      options: ['Monthly', 'Semimonthly', 'BiWeekly', 'Weekly'],
      label: 'Pay Period Frequency',
      required: false,
    },
    Ssn: {
      datatype: 'integer',
      label: 'SSN',
      required: false,
    },
    HoursWorked: {
      datatype: 'float',
      label: 'Hours Worked',
      required: false,
    },
  },
};
