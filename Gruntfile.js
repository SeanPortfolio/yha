module.exports = function(grunt) {
  
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    htmlBuildFixturesPath: 'components',
		concat:{
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm") %> */\n',
				separator: ';'
			},
			basic_and_extras: {
				files:{
					'assets/js/vendor/min/production.js': [
            'assets/js/vendor/unmin/underscore.js',
            'assets/js/vendor/unmin/jquery-3.2.1.js',
            'assets/js/vendor/unmin/bootstrap.js',
            'assets/js/vendor/unmin/slick.js',
            'assets/js/vendor/unmin/moment.js',
            'assets/js/vendor/unmin/pikaday.js',
            'assets/js/vendor/unmin/jquery.swipebox.js',
            'assets/js/scripts/unmin/map.js',
            'assets/js/scripts/unmin/imap.js',
            'assets/js/scripts/unmin/accordion.js'
					],
					'assets/js/scripts/min/main.js': [
						'assets/js/scripts/unmin/base.js'
					]
				}
			}
		},

		uglify:{
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: [{
		            src: 'assets/js/vendor/min/production.js',
		            dest: 'assets/js/vendor/min/production.js'
		        }, {
		            src: 'assets/js/scripts/min/main.js',
		            dest: 'assets/js/scripts/min/main.js'
		        }]
			}
		},
		sass: {
			dist: {
        options: {
          style: 'expanded'
        }, 
        files: {
          'assets/css/_main_xl.css' : 'assets/sass/main.scss'
        }
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'assets/css/main.css': 'assets/css/_main_xl.css'
				}
			}
		},
    sprite:{
      
      all: {
        padding: 5,
        src: 'graphics/sprite-icons/*.png',
        dest: 'graphics/sprite.png',
        destCss: 'assets/css/sprites.css',
        algorithm: 'top-down'
      }
    },
    htmlbuild: {
      dist: {
        src: [
          'templates/**/*.html'
        ],
        dest: './',
        options: {
          beautify: false,
          //allowUnknownTags: true,
          //parseTag: 'htmlbuild',
          // keepTags: true,
          relative: true,
          processFiles: true,
          sections: {
            views: '<%= htmlBuildFixturesPath %>/**/*.tmpl',
            layouts: {
              head: '<%= htmlBuildFixturesPath %>/base/head.tmpl',
              body: '<%= htmlBuildFixturesPath %>/base/body.tmpl',
  						header: {
                layout: '<%= htmlBuildFixturesPath %>/base/header/layout.tmpl',
                navigation: '<%= htmlBuildFixturesPath %>/base/header/navigation.tmpl',
                bookingPanel: '<%= htmlBuildFixturesPath %>/base/header/booking-panel.tmpl',
                menus: {
                  hostel: '<%= htmlBuildFixturesPath %>/base/header/menu/hostel.tmpl',
                  membership: '<%= htmlBuildFixturesPath %>/base/header/menu/membership.tmpl',
                  travelInfo: '<%= htmlBuildFixturesPath %>/base/header/menu/travel-info.tmpl',
                  groups: '<%= htmlBuildFixturesPath %>/base/header/menu/groups.tmpl',
                  about: '<%= htmlBuildFixturesPath %>/base/header/menu/about.tmpl'
                }
              },
  						footer: {
                upper: '<%= htmlBuildFixturesPath %>/base/footer/upper.tmpl',
                lower: '<%= htmlBuildFixturesPath %>/base/footer/lower.tmpl',
                layout: '<%= htmlBuildFixturesPath %>/base/footer/layout.tmpl',
                localStories: '<%= htmlBuildFixturesPath %>/base/footer/local-stories.tmpl',
                newsletterForm: '<%= htmlBuildFixturesPath %>/base/footer/newsletter-form.tmpl',
                dreamBadge: '<%= htmlBuildFixturesPath %>/base/footer/dream-badge.tmpl',
                socialLinks: '<%= htmlBuildFixturesPath %>/base/footer/social-links.tmpl',
                navigation: '<%= htmlBuildFixturesPath %>/base/footer/navigation.tmpl',
                navigationMobile: '<%= htmlBuildFixturesPath %>/base/footer/navigation-mobile.tmpl',
                agentLogin: '<%= htmlBuildFixturesPath %>/base/footer/agent-login.tmpl',
                credits: '<%= htmlBuildFixturesPath %>/base/footer/credits.tmpl',
                layoutMobile: '<%= htmlBuildFixturesPath %>/base/footer/layout-mobile.tmpl',
                lowerMobile: '<%= htmlBuildFixturesPath %>/base/footer/lower-mobile.tmpl',
              },
              banner: {
                bannerGallery: '<%= htmlBuildFixturesPath %>/base/banner/gallery.tmpl',
                bannerHeroshot: '<%= htmlBuildFixturesPath %>/base/banner/heroshot.tmpl',
                bannerVideo: '<%= htmlBuildFixturesPath %>/base/banner/video.tmpl',
                bannerHeroshotSm: '<%= htmlBuildFixturesPath %>/base/banner/heroshot-sm.tmpl'
              },
              grid: {
                gridDefault: '<%= htmlBuildFixturesPath %>/base/grid/default.tmpl',
                gridColTwo: '<%= htmlBuildFixturesPath %>/base/grid/grid-col-2.tmpl',
                gridColThree: '<%= htmlBuildFixturesPath %>/base/grid/grid-col-3.tmpl'
              },
              hostel_list: {
                hostelList: '<%= htmlBuildFixturesPath %>/base/hostel_list/hostel-list.tmpl',
                hostelPanel: '<%= htmlBuildFixturesPath %>/base/hostel_list/hostel-panel.tmpl'
              },
              booking: {
                form: '<%= htmlBuildFixturesPath %>/base/booking_panel/form.tmpl'
              },
              home: {
                banner: {
                  layout: '<%= htmlBuildFixturesPath %>/home/banner/layout.tmpl',
                  bookingPanel: '<%= htmlBuildFixturesPath %>/home/banner/booking-panel.tmpl',
                  svgMap: '<%= htmlBuildFixturesPath %>/home/banner/map-svg.tmpl',
                  hotelInfoPanel: '<%= htmlBuildFixturesPath %>/home/banner/hotel-info-panel.tmpl',
                },
                gridDefault: '<%= htmlBuildFixturesPath %>/home/grid/default.tmpl',
                gridPortrait: '<%= htmlBuildFixturesPath %>/home/grid/portrait.tmpl',
                gridThumbs: '<%= htmlBuildFixturesPath %>/home/grid/thumbs.tmpl'
              }, 
              bookingEnquiry: {
                form: '<%= htmlBuildFixturesPath %>/booking-enquiry/form.tmpl'
              }, 
              hostelDetail: {
                grid: '<%= htmlBuildFixturesPath %>/hostel-detail/grid.tmpl',
                sidebar: '<%= htmlBuildFixturesPath %>/hostel-detail/sidebar.tmpl',
                slider: '<%= htmlBuildFixturesPath %>/hostel-detail/slider.tmpl',
                nav: '<%= htmlBuildFixturesPath %>/hostel-detail/nav.tmpl',
                section: {
                  heading: '<%= htmlBuildFixturesPath %>/hostel-detail/section/heading.tmpl',
                  detail: '<%= htmlBuildFixturesPath %>/hostel-detail/section/detail.tmpl',
                  overview: '<%= htmlBuildFixturesPath %>/hostel-detail/section/overview.tmpl',
                  availability: '<%= htmlBuildFixturesPath %>/hostel-detail/section/availability.tmpl',
                  facilities: '<%= htmlBuildFixturesPath %>/hostel-detail/section/facilities.tmpl',
                  activities: '<%= htmlBuildFixturesPath %>/hostel-detail/section/activities.tmpl'
                }
              },
              mobileHostelDetail: {
                content: '<%= htmlBuildFixturesPath %>/m-hostel-detail/content.tmpl',
                gallery: '<%= htmlBuildFixturesPath %>/m-hostel-detail/gallery.tmpl',
                contactDetails: '<%= htmlBuildFixturesPath %>/m-hostel-detail/contact-details.tmpl',
                details: '<%= htmlBuildFixturesPath %>/m-hostel-detail/details.tmpl',
                map: '<%= htmlBuildFixturesPath %>/m-hostel-detail/map.tmpl',
                overview: '<%= htmlBuildFixturesPath %>/m-hostel-detail/overview.tmpl',
                availability: '<%= htmlBuildFixturesPath %>/m-hostel-detail/availability.tmpl',
                facilities: '<%= htmlBuildFixturesPath %>/m-hostel-detail/facilities.tmpl',
                logos: '<%= htmlBuildFixturesPath %>/m-hostel-detail/logos.tmpl'
              },
              groupDetail: {
                grid: '<%= htmlBuildFixturesPath %>/group-detail/grid.tmpl',
                sidebar: '<%= htmlBuildFixturesPath %>/group-detail/sidebar.tmpl',
                slider: '<%= htmlBuildFixturesPath %>/group-detail/slider.tmpl',
                nav: '<%= htmlBuildFixturesPath %>/group-detail/nav.tmpl',
                section: {
                  heading: '<%= htmlBuildFixturesPath %>/group-detail/section/heading.tmpl',
                  detail: '<%= htmlBuildFixturesPath %>/group-detail/section/detail.tmpl',
                  overview: '<%= htmlBuildFixturesPath %>/group-detail/section/overview.tmpl',
                  facilities: '<%= htmlBuildFixturesPath %>/group-detail/section/facilities.tmpl',
                  capacity: '<%= htmlBuildFixturesPath %>/group-detail/section/capacity.tmpl'
                }
              }
  					},
            faqs: {
              main: '<%= htmlBuildFixturesPath %>/faqs/main.tmpl'
            },
            blog: {
              landingPage: '<%= htmlBuildFixturesPath %>/blog/landing-page.tmpl',
              gridSm: '<%= htmlBuildFixturesPath %>/blog/grid-sm.tmpl',
              relatedStories: '<%= htmlBuildFixturesPath %>/blog/related-stories.tmpl'
            },
            membersDiscounts: {
              landingPage: '<%= htmlBuildFixturesPath %>/members-discounts/landing-page.tmpl',
            },
            destination: {
              stories: '<%= htmlBuildFixturesPath %>/destination/stories.tmpl',
              events: '<%= htmlBuildFixturesPath %>/destination/events.tmpl',
              nearbyHostels: '<%= htmlBuildFixturesPath %>/destination/nearby-hostels.tmpl'
            },
            membership: {
              registerationForm: '<%= htmlBuildFixturesPath %>/membership/registeration-form.tmpl',
              benifits: '<%= htmlBuildFixturesPath %>/membership/benifits.tmpl',
              pricingGrid: '<%= htmlBuildFixturesPath %>/membership/pricing-grid.tmpl',
              grid: '<%= htmlBuildFixturesPath %>/membership/grid.tmpl',
            }, 
            map: {
              filter: '<%= htmlBuildFixturesPath %>/map/filter.tmpl',
              canvas: '<%= htmlBuildFixturesPath %>/map/canvas.tmpl'
            }
          },
          data: {
            version: "0.1.0"
          },
        }
      }
    },
		watch: {
      scripts:{
        files: ['assets/js/vendor/unmin/*.js',
          'assets/js/scripts/unmin/*.js',
          'Gruntfile.js'
        ],
        tasks: ['concat', 'uglify'],
      },
      css: {
        files: 'assets/sass/**/*.scss',
        tasks: ['sass', 'cssmin']
      },
      sprite: {
        files: [
          'graphics/sprite-icons/*'
        ],
        tasks: ['sprite']
      }, 
      htmlbuild: {
        files: [
          'components/**/*.tmpl',
          'templates/**/*.html',
          'Gruntfile.js'
        ],
        tasks: ['htmlbuild']
      }
      
    }

	});

  
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Default task(s).
	grunt.registerTask('default', ['watch']);

};