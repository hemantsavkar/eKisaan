var ekisaan_config = angular.module('ekisaan_languages', [])
    .constant('Languages', {
        marathi: {
            TITLE: 'ईकिसान',
            MENU:{
                HOME: 'मुख्यपृष्ठ',
                RATES: 'बाजारभाव',
                FAVOURITES: 'मनपसंत',
                ANALYSYS: 'विश्लेषण',
                REGISTER: 'नोंदणी',
                SHARE: 'शेअर',
                SETTINGS: 'सेटिंग्ज',
                HELP: 'मदत'
            },
            RATES: {
                TITLE: 'बाजारभाव',
                STATE: 'राज्य',
                MARKET: 'बाजार',
                SEARCH: 'शोधा',
                ADDTOFAVMSG: 'आपण आपल्या मनपसंत यादीत {0} जोडू इच्छित आहात का?',
                ADDTOFAVMSGTIT: "मनपसंत यादीत जोडा",
                REMOVETOFAVMSG: 'आपण {0} आपल्या मनपसंत यादितुन काढु इच्छिता का ?',
                REMOVETOFAVMSGTIT: "मनपसंत यादितुन काढा",
                SEARCHTABLE:{
                    COMMODITY:'माल',
                    MODAL: 'सरासरी',
                    MIN: 'किमान',
                    MAX: 'कमाल',
                    VARIETY: 'जात'
                }
            },
            FAVOURITES: {
                TITLE: 'मनपसंत',
                TITLECOMMODITIES: 'मनपसंत व्यापारी माल',
                TITLEMARJETS: 'मनपसंत बाजार',
                MARKET: 'बाजार',
                COMMODITY: 'व्यापारी माल'
            },
            REGISTER: {
                TITLE: 'ईकिसान वर नोंदणी करा',
                FIRSTNAME: 'नाव',
                LASTNAME: 'आडनांव',
                MOBILENO: 'मोबाइल नंबर',
                CITY: 'शहर/तालुका/गाव',
                DISCTRICT: 'ज़िल्हा',
                STATE: 'राज्य',
                INVALIDMOBILE: 'टाकलेला नंबर चुकीचा आहे !'
            },
            SHARE: {
                TITLE: 'शेअर',
            },
            ANALYSYS: {
                TITLE: 'विश्लेषण',
            },
            SETTINGS: {
                TITLE: 'सेटिंग्ज',
                LANGUAGE: 'भाषा',
                LOCATION: 'लोकेशन सर्विस वापरन्यास अनुमति'
            },
            HELP: {
                TITLE: 'मदत',
                CALLAT: 'मदत संपर्क',
                WEBSITE: 'वेब साईट',
                EMAIL: 'ई मेल'
            },
            ITEMDETAILS: {
                MODAL: 'सरासरी',
                MIN: 'किमान',
                MAX: 'कमाल',
                VARIETY: 'जात',
                TOTALARRIVAL: 'एकूण आगमन',
                LASTFIVE: 'गेल्या पाच दिवसात दर (रुपया मध्ये)',
                DATE: 'तारीख',
                RS: 'रुपये',
                TONNES: 'टन'
            }

        },
        english: {
            TITLE: 'eKisaan',
            MENU: {
                HOME: 'Home',
                RATES: 'Rates',
                FAVOURITES: 'Favourites',
                ANALYSYS: 'Analysys',
                REGISTER: 'Register',
                SHARE: 'Share',
                SETTINGS: 'Settings',
                HELP: 'Help',
            },
            RATES: {
                TITLE: 'Rates',
                STATE: 'State',
                MARKET: 'Markets',
                SEARCH: 'Search',
                ADDTOFAVMSG: 'Are you sure you want to add {0} to your Favouites list',
                ADDTOFAVMSGTIT: "Add to Favouites",
                REMOVETOFAVMSG: 'Are you sure you want to Remove {0}</b> from your Favouites list ?',
                REMOVETOFAVMSGTIT: "Remove From Favouites",
                SEARCHTABLE:{
                    COMMODITY:'Commodity',
                    MODAL: 'Modal',
                    MIN: 'Min',
                    MAX: 'Max',
                    VARIETY: 'Variety'
                }

            },
            FAVOURITES: {
                TITLE: 'Favourites',
                TITLECOMMODITIES: 'Favourite Commodities',
                TITLEMARJETS: 'Favourite Markets',
                MARKET: 'Market',
                COMMODITY: 'Commodities'
            },
            REGISTER: {
                TITLE: 'Register With eKisaan',
                FIRSTNAME: 'First Name',
                LASTNAME: 'Last Name',
                MOBILENO: 'Mobile No',
                CITY: 'City/Town/Village',
                DISTRICT: 'District',
                STATE: 'State',
                INVALIDMOBILE: 'The value is not a valid mobile no!'
            },
            ANALYSYS: {
                TITLE: 'Analysis',
            },
            SHARE: {
                TITLE: 'Share',
            },
            SETTINGS: {
                TITLE: 'Settings',
                LANGUAGE: 'Language',
                LOCATION: 'Allow to Use Location'
            },
            HELP: {
                TITLE: 'Help',
                CALLAT: 'Support Contact No',
                WEBSITE: 'Web Site',
                EMAIL: 'E Mail'
            },
            ITEMDETAILS: {
                MODAL: 'Modal',
                MIN: 'Min',
                MAX: 'Max',
                VARIETY: 'Variety',
                TOTALARRIVAL: 'Total Arrival',
                LASTFIVE: 'Last Five Days Rates (in Rs)',
                DATE: 'Date',
                RS: 'Rs',
                TONNES: 'Tonnes'
            }
        }

    });