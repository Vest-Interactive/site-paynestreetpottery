
/**
 * jquery.calendario.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {
	
	'use strict';

	$.Calendario = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	// the options
	$.Calendario.defaults = {
		/*
		you can also pass:
		month : initialize calendar with this month (1-12). Default is today.
		year : initialize calendar with this year. Default is today.
		caldata : initial data/content for the calendar.
		caldata format:
		{
			'MM-DD-YYYY' : 'HTML Content',
			'MM-DD-YYYY' : 'HTML Content',
			'MM-DD-YYYY' : 'HTML Content'
			...
		}
		*/
		weeks : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		weekabbrs : [ 'SU', 'M', 'T', 'W', 'TH', 'F', 'S' ],
		months : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		monthabbrs : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		// choose between values in options.weeks or options.weekabbrs
		displayWeekAbbr : false,
		// choose between values in options.months or options.monthabbrs
		displayMonthAbbr : false,
		// left most day in the calendar
		// 0 - Sunday, 1 - Monday, ... , 6 - Saturday
		startIn : 0,
		onDayClick : function( $el, $content, dateProperties ) { return false; },
		monthView : function( caldata ) { return caldata; }
	};

	$.Calendario.prototype = {

		_init : function( options ) {
			
			// options
			this.options = $.extend( true, {}, $.Calendario.defaults, options );

			this.today = new Date();
			this.month = ( isNaN( this.options.month ) || this.options.month == null) ? this.today.getMonth() : this.options.month - 1;
			this.year = ( isNaN( this.options.year ) || this.options.year == null) ? this.today.getFullYear() : this.options.year;
			this.caldata = this.options.caldata || {};
			this._generateTemplate();
			this._initEvents();

		},
		_initEvents : function() {

			var self = this;

			this.$el.on( 'click.calendario', 'div.fc-row > div', function() {

				var $cell = $( this ),
					idx = $cell.index(),
					$content = $cell.children( 'div' ),
					dateProp = {
						day : $cell.children( 'span.fc-date' ).text(),
						month : self.month + 1,
						monthname : self.options.displayMonthAbbr ? self.options.monthabbrs[ self.month ] : self.options.months[ self.month ],
						year : self.year,
						weekday : idx + self.options.startIn,
						weekdayname : self.options.weeks[ idx + self.options.startIn ]
					};

				if( dateProp.day ) {
					self.options.onDayClick( $cell, $content, dateProp );
					//console.log($cell);
				}

				/*if (dateProp.month) {
					self.options.monthView($cell, $content, dateProp);
					console.log($cell);
				}*/

			} );

		},
		// Calendar logic based on http://jszen.blogspot.pt/2007/03/how-to-build-simple-calendar-with.html
		_generateTemplate : function( callback ) {

			var head = this._getHead(),
				body = this._getBody(),
				rowClass;

			switch( this.rowTotal ) {
				case 4 : rowClass = 'fc-four-rows'; break;
				case 5 : rowClass = 'fc-five-rows'; break;
				case 6 : rowClass = 'fc-six-rows'; break;
			}

			this.$cal = $( '<div class="fc-calendar ' + rowClass + '">' ).append( head, body );

			this.$el.find( 'div.fc-calendar' ).remove().end().append( this.$cal );

			if( callback ) { callback.call(); }

			// Generate Month?
			//$('#cal-detail').append(this.$cal);

		},
		_getHead : function() {

			var html = '<div class="fc-head">';
		
			for ( var i = 0; i <= 6; i++ ) {

				var pos = i + this.options.startIn,
					j = pos > 6 ? pos - 6 - 1 : pos;

				html += '<div>';
				html += this.options.displayWeekAbbr ? this.options.weekabbrs[ j ] : this.options.weeks[ j ];
				html += '</div>';

			}

			html += '</div>';

			return html;

		},
		_getBody : function() {

			var d = new Date( this.year, this.month + 1, 0 ),
				// number of days in the month
				monthLength = d.getDate(),
				firstDay = new Date( this.year, this.month, 1 );

			// day of the week
			this.startingDay = firstDay.getDay();

			var html = '<div class="fc-body"><div class="fc-row">',
				// fill in the days
				day = 1;

			// this loop is for weeks (rows)
			for ( var i = 0; i < 7; i++ ) {

				// this loop is for weekdays (cells)
				for ( var j = 0; j <= 6; j++ ) {

					var pos = this.startingDay - this.options.startIn,
						p = pos < 0 ? 6 + pos + 1 : pos,
						inner = '',
						today = this.month === this.today.getMonth() && this.year === this.today.getFullYear() && day === this.today.getDate(),
						content = '';
					
					if ( day <= monthLength && ( i > 0 || j >= p ) ) {

						inner += '<span class="fc-date">' + day + '</span><span class="fc-weekday">' + this.options.weekabbrs[ j + this.options.startIn > 6 ? j + this.options.startIn - 6 - 1 : j + this.options.startIn ] + '</span>';

						// this day is:
						var strdate = ( this.month + 1 < 10 ? '0' + ( this.month + 1 ) : this.month + 1 ) + '-' + ( day < 10 ? '0' + day : day ) + '-' + this.year,
							dayData = this.caldata[ strdate ];

						if( dayData ) {
							content = dayData;
						}

						if( content !== '' ) {
							//inner += '<div>' + content + '</div>';  // Dont display on calendar cell
							inner += '<div class="event">event </div>';
						}

						++day;

					}

					var cellClasses = today ? 'fc-today ' : '';
					if( content !== '' ) {
						cellClasses += 'fc-content';
					}

					html += cellClasses !== '' ? '<div class="' + cellClasses + '">' : '<div>';
					html += inner;
					html += '</div>';

				}

				// stop making rows if we've run out of days
				if (day > monthLength) {
					this.rowTotal = i + 1;
					break;
				} 
				else {
					html += '</div><div class="fc-row">';
				}

			}
			html += '</div></div>';

			return html;

		},
		// based on http://stackoverflow.com/a/8390325/989439
		_isValidDate : function( date ) {

			date = date.replace(/-/gi,'');
			var month = parseInt( date.substring( 0, 2 ), 10 ),
				day = parseInt( date.substring( 2, 4 ), 10 ),
				year = parseInt( date.substring( 4, 8 ), 10 );

			if( ( month < 1 ) || ( month > 12 ) ) {
				return false;
			}
			else if( ( day < 1 ) || ( day > 31 ) )  {
				return false;
			}
			else if( ( ( month == 4 ) || ( month == 6 ) || ( month == 9 ) || ( month == 11 ) ) && ( day > 30 ) )  {
				return false;
			}
			else if( ( month == 2 ) && ( ( ( year % 400 ) == 0) || ( ( year % 4 ) == 0 ) ) && ( ( year % 100 ) != 0 ) && ( day > 29 ) )  {
				return false;
			}
			else if( ( month == 2 ) && ( ( year % 100 ) == 0 ) && ( day > 29 ) )  {
				return false;
			}

			return {
				day : day,
				month : month,
				year : year
			};

		},
		_move : function( period, dir, callback ) {

			if( dir === 'previous' ) {
				
				if( period === 'month' ) {
					this.year = this.month > 0 ? this.year : --this.year;
					this.month = this.month > 0 ? --this.month : 11;
				}
				else if( period === 'year' ) {
					this.year = --this.year;
				}

			}
			else if( dir === 'next' ) {

				if( period === 'month' ) {
					this.year = this.month < 11 ? this.year : ++this.year;
					this.month = this.month < 11 ? ++this.month : 0;
				}
				else if( period === 'year' ) {
					this.year = ++this.year;
				}

			}

			this._generateTemplate( callback );

		},
		/************************* 
		******PUBLIC METHODS *****
		**************************/
		getYear : function() {
			return this.year;
		},
		getMonth : function() {
			return this.month + 1;
		},
		getMonthName : function() {
			return this.options.displayMonthAbbr ? this.options.monthabbrs[ this.month ] : this.options.months[ this.month ];
		},
		// gets the cell's content div associated to a day of the current displayed month
		// day : 1 - [28||29||30||31]
		getCell : function( day ) {

			var row = Math.floor( ( day + this.startingDay - this.options.startIn ) / 7 ),
				pos = day + this.startingDay - this.options.startIn - ( row * 7 ) - 1;

			return this.$cal.find( 'div.fc-body' ).children( 'div.fc-row' ).eq( row ).children( 'div' ).eq( pos ).children( 'div' );

		},
		setData : function( caldata ) {

			caldata = caldata || {};
			$.extend( this.caldata, caldata );
			this._generateTemplate();

		},
		// goes to today's month/year
		gotoNow : function( callback ) {

			this.month = this.today.getMonth();
			this.year = this.today.getFullYear();
			this._generateTemplate( callback );

		},
		// goes to month/year
		goto : function( month, year, callback ) {

			this.month = month;
			this.year = year;
			this._generateTemplate( callback );

		},
		gotoPreviousMonth : function( callback ) {
			this._move( 'month', 'previous', callback );
		},
		gotoPreviousYear : function( callback ) {
			this._move( 'year', 'previous', callback );
		},
		gotoNextMonth : function( callback ) {
			this._move( 'month', 'next', callback );
		},
		gotoNextYear : function( callback ) {
			this._move( 'year', 'next', callback );
		}

	};
	
	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.calendario = function( options ) {

		var instance = $.data( this, 'calendario' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on calendario prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for calendario instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'calendario', new $.Calendario( options, this ) );
				
				}

			});
		
		}
		
		return instance;
		
	};
	
} )( jQuery, window );
/*!
 * slidr v0.5.0 - A Javascript library for adding slide effects.
 * bchanx.com/slidr
 * MIT licensed
 *
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 */
function E(){function H(){}function K(a,b,c){var d={id:a,a:b,h:null,controls:null,d:c,u:!1,v:!1,start:null,c:null,j:{id:null,ga:5E3,direction:"right"},W:{},K:{},D:{},i:{up:null,down:null,left:null,right:null}};return{start:function(a){q.start(d,a);return this},canSlide:function(a){return q.N(d,a)},slide:function(a){q.s(d,a);return this},add:function(a,b,c,e){q.add(d,a,b,c,e);return this},auto:function(a,b,c){q.start(d,c);q.j(d,a||d.j.ga,b||d.j.direction);return this},stop:function(){q.stop(d);return this},
timing:function(a,b){a&&a.constructor===Object?d.d.timing=A(d.d.timing,a):"string"===typeof a&&"string"===typeof b&&(d.d.timing[a]=b);return this},breadcrumbs:function(){q.h(d);return this},controls:function(a){q.controls(d,a);return this}}}function G(a,b){var c=a,d;for(d in b){if(!c||!c.hasOwnProperty(b[d]))return null;c=c[b[d]]}return c===a?null:c}function A(){for(var a={},b=0,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}function I(a,b){return a.contains?a.contains(b):a.compareDocumentPosition?
a.compareDocumentPosition(b)&16:0}function x(a,b){if(Array.prototype.indexOf)return a.indexOf(b);for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1}function J(a){return"".trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function y(a,b){var c=document.createElement(a),d;for(d in b)c[d]=b[d];return c}function v(a,b){for(var c=J(a.className),c=c?c.split(/\s+/):[],d=2,g,f;g=arguments[d];d++)f=x(c,g),"add"===b&&0>f&&c.push(g),"rm"===b&&0<=f&&c.splice(f,1);a.className=c.join(" ");return a}function C(a){return a.replace(/[\s'"]/gi,
"").split("").sort().join("")}function D(a,b){return a&&a.getAttribute?a.getAttribute(b):null}function h(a,b){if("string"===typeof b){var c=document.defaultView?document.defaultView.getComputedStyle(a):a.currentStyle,d=c[e.q(b)];d||"opacity"!==b||(d=c.filter?c.filter.split("=")[1].replace(")",""):"1");return d?(c=d.slice(0,-2),"px"===d.slice(-2)&&!isNaN(parseInt(c))&&0>=c.search("px")?parseInt(c):d):"none"}for(d in b)e.q(d)&&(a.style[e.q(d)]=b[d]);return a}function w(a,b,c,d){"string"===typeof b&&
(b=[b]);for(var g=0,f,F;f=b[g];g++)F=0<x(e.M,f),f="click"===f&&"ontouchstart"in window?"touchend":a.attachEvent&&!F?"on"+f:f,a.attachEvent&&!F?d?a.detachEvent(f,c):a.attachEvent(f,c):d?a.removeEventListener(f,c):a.addEventListener(f,c)}function z(a){return"border-box"===h(a,"box-sizing")}var e={J:["webkit","Moz","ms","O"],e:{},T:{},k:function(){e.supports("filter")&&!e.supports("opacity")?e.k=function(){return!0}:e.k=function(){return!1};return e.k()},ja:document.getElementsByTagName("html")[0].style,
styleSheet:function(){var a=y("style",{type:"text/css"});document.getElementsByTagName("head")[0].appendChild(a);return a.sheet||a.styleSheet}(),cssRules:function(){e.cssRules=function(){return e.styleSheet.cssRules||e.styleSheet.rules};return e.cssRules()},insertRule:function(a){e.insertRule=e.styleSheet.insertRule?function(a){e.styleSheet.insertRule(a,e.cssRules().length)}:function(a){var c=a.split(" {");2===c.length&&(a=c[0],c=J(c[1].replace(/;?\s?}$/g,"")),a&&c&&e.styleSheet.addRule(a,c))};e.insertRule(a)},
Y:function(a,b,c){a=C(a);for(var d=0,g,f;g=e.cssRules()[d];d++)if(f=C(g.name||g.selectorText||g.cssText.split(" {")[0]||""),f===a){if(c||C(g.cssText)===C(b))return;e.styleSheet.deleteRule(d);break}e.insertRule(b)},aa:function(a,b){var c=[a,"{"],d;for(d in b)e.q(d,!0)&&c.push(e.q(d,!0)+":"+b[d]+";");c.push("}");return c.join(" ")},f:function(a,b,c){e.Y(a,e.aa(a,b),c)},prefix:function(a){return 3===a.split("-").length?"-"+a.split("-")[1]+"-":""},O:function(a,b){var c=e.q("animation",!0);if(c&&!e.T[a]){var c=
["@"+e.prefix(c)+"keyframes "+a+" {"],d;for(d in b)c.push(e.aa(d+"%",b[d]));c.push("}");e.Y(a,c.join(" "));e.T[a]=!0}},q:function(a,b){if(!(a in e.e)){for(var c=a.split("-"),d=0,g;g=c[d];d++)c[d]=g[0].toUpperCase()+g.toLowerCase().slice(1);g=c.join("");g=g[0].toLowerCase()+g.slice(1);if(void 0!==e.ja[g])e.e[a]={t:a,ca:g};else for(g=c.join(""),d=0;d<e.J.length;d++)void 0!==e.ja[e.J[d]+g]&&(e.e[a]={t:"-"+e.J[d].toLowerCase()+"-"+a,ca:e.J[d]+g});e.e[a]||(e.e[a]=null)}return null!==e.e[a]?b?e.e[a].t:
e.e[a].ca:null},supports:function(){for(var a=0,b;b=arguments[a];a++)if(!e.q(b))return!1;return!0},add:{fade:function(a,b,c){e.O(a,{0:{opacity:b,visibility:"visible"},100:{opacity:c,visibility:"hidden"}})},linear:function(a,b,c,d,g,f){e.O(a,{0:{transform:"translate"+c[0]+"(0%)",opacity:"in"===b?"0":g,visibility:"visible"},1:{transform:"translate"+c+"px)",opacity:g},99:{transform:"translate"+d+"px)",opacity:f},100:{transform:"translate"+d[0]+"(0%)",opacity:"out"===b?"0":f,visibility:"hidden"}})},cube:function(a,
b,c,d,g,f){e.O(a,{0:{transform:"rotate"+b+"0deg) translateZ("+d+"px)",opacity:g,visibility:"visible"},100:{transform:"rotate"+c+"0deg) translateZ("+d+"px)",opacity:f,visibility:"hidden"}})}},$:function(a){return{Ba:a,r:'aside[id*="-'+a+'"]',i:"slidr-"+a,w:'aside[id*="-'+a+'"] .slidr-'+a,data:"data-slidr-"+a,id:function(b,c){return c?'aside[id="'+b.id+"-"+a+'"]':b.id+"-"+a}}},o:function(a){a=a||window.event;a.target||(a.target=a.srcElement);a.currentTarget||(a.currentTarget=a.srcElement);!a.which&&
a.keyCode&&(a.which=a.keyCode);return a},stop:function(a){a=a||window.event;a.cancelBubble=!0;a.returnValue=!1;a.stopPropagation&&a.stopPropagation();a.preventDefault&&a.preventDefault();return!1},M:["animationend","webkitAnimationEnd","oanimationend","MSAnimationEnd"]},t={Z:["cube","fade","linear","none"],L:function(a,b){b=b||a.d.transition;return 0>x(t.Z,b)||!u.ka[b]?"none":b},get:function(a,b,c,d){return G(a.K,[b,"in"===c?l.I(d):d])},set:function(a,b,c,d){d=t.L(a,d);a.K[b]||(a.K[b]={});return a.K[b][c]=
d},apply:function(a,b,c,d,g){p.update(a,b,c);u.B(a,b,g,c,d)}},r={e:{},hash:function(a){return[a.id,a["in"].slidr,a["in"].trans,a["in"].dir,a.out.slidr,a.out.trans,a.out.dir].join("-")},ua:function(a,b,c,d,g,f,e){return{id:a.id,"in":{el:l.get(a,c).m,slidr:c,trans:e,dir:g},out:{el:l.get(a,b).m,slidr:b,trans:f,dir:l.I(d)}}},C:function(a,b){var c=r.hash(b);r.e[c]||(r.e[c]={});r.e[c].C||(r.e[c].C=!0,c=a.d.before,"function"===typeof c&&c(b))},A:function(a,b){var c=r.hash(b);r.e[c].A||(r.e[c].A=!0,c=a.d.after,
"function"===typeof c&&r.na(c,b))},na:function(a,b){if(e.supports("animation")&&"none"!==b["in"].trans){var c=function(d){e.T[d.animationName]&&(a(b),w(b["in"].el,e.M,c,!0),r.reset(b))};w(b["in"].el,e.M,c)}else a(b),r.reset(b)},reset:function(a){a=r.hash(a);r.e[a].C=!1;r.e[a].A=!1}},l={F:"left up top right down bottom".split(" "),H:function(a){return 0<=x(l.F,a)},I:function(a){var b=l.F.length;return l.H(a)?l.F[(x(l.F,a)+b/2)%b]:null},get:function(a){for(var b=[],c=1,d;void 0!==(d=arguments[c++]);b.push(d));
return G(a.W,b)},display:function(a){!a.v&&l.get(a,a.start)&&(a.c=a.start,p.create(a),m.create(a),u.G(a,a.c,"fade"),u.B(a,a.c,"fade","in"),a.v=!0,q.controls(a,a.d.controls),a.d.breadcrumbs&&q.h(a))},s:function(a,b){return l.H(b)?l.go(a,l.get(a,a.c,b),b,b):l.ta(a,b)},ta:function(a,b){if(b&&b!==a.c&&l.get(a,b)){var c=a.D[a.c],d=a.D[b],g=c.x<d.x?"right":c.x>d.x?"left":null,d=c.y<d.y?"up":c.y>d.y?"down":null,c=t.get(a,a.c,"out",g)?g:t.get(a,a.c,"out",d)?d:null,g=t.get(a,b,"in",g)?g:t.get(a,b,"in",d)?
d:null;l.go(a,b,c,g,c?null:"fade",g?null:"fade")}},go:function(a,b,c,d,g,f){if(a.c&&b){f=f||t.get(a,b,"in",d);g=g||t.get(a,a.c,"out",c);var e=r.ua(a,a.c,b,c,d,g,f);r.C(a,e);t.apply(a,b,"in",d,f);t.apply(a,a.c,"out",c,g);r.A(a,e);a.c=b;m.update(a);return!0}return!1},find:function(a,b){for(var c=b?[]:{},d=0,g,f;g=a.a.childNodes[d];d++)(f=D(g,"data-slidr"))&&(b&&0>x(c,f)?c.push(f):f in c||(c[f]=g));return c},L:function(a,b,c,d,g,f){if(!b||b.constructor!==Array)return!1;for(var e=0,n,h,k,m,p,q,r,s;n=
b[e];e++)if(!(n in d)||l.get(a,n)&&(h=b[e-1]||null,k=b[e+1]||null,m=l.get(a,n,g),p=l.get(a,n,f),q=l.get(a,k,g),r=t.get(a,n,"out",g),s=t.get(a,n,"out",f),p&&k&&p!=k||m&&h&&m!=h||q&&q!=n||h&&r&&r!=c||k&&s&&s!=c))return!1;return!0},add:function(a,b,c,d,g,e){for(var h=0,n;n=b[h];h++){a.W[n]=a.W[n]||{};var k=l.get(a,n);k.m=d[n];b[h-1]&&(k[g]=b[h-1],t.set(a,n,g,c));b[h+1]&&(k[e]=b[h+1],t.set(a,n,e,c));u.G(a,n,c);a.start=a.start?a.start:n}a.u&&(a.v?p.create(a):l.display(a));return!0}},m={b:e.$("control"),
types:["border","corner","none"],valid:function(a){return 0<=x(m.types,a)},create:function(a){if(a.a&&!a.controls){a.controls=h(v(y("aside",{id:m.b.id(a)}),"add","disabled"),{opacity:"0",filter:"alpha(opacity=0)","z-index":"0",visibility:"hidden","pointer-events":"none"});for(var b in a.i){var c=a.i,d=b,g=v(y("div"),"add",m.b.i,b);g&&g.setAttribute&&g.setAttribute(m.b.data,b);c[d]=g;a.controls.appendChild(a.i[b])}m.t(a);a.a.appendChild(a.controls);w(a.controls,"click",m.onclick(a))}},t:function(a){e.f(m.b.r,
{position:"absolute",bottom:h(a.a,"padding-bottom")+"px",right:h(a.a,"padding-right")+"px",padding:"10px","box-sizing":"border-box",width:"75px",height:"75px",transform:"translateZ(9998px)"},!0);e.f(m.b.r+".disabled",{transform:"translateZ(0px) !important"},!0);e.f(m.b.r+".breadcrumbs",{left:h(a.a,"padding-left")+"px",right:"auto"},!0);e.f(m.b.r+".border",{bottom:"0",right:"0",left:"0",width:"100%",height:"100%"},!0);e.f(m.b.w,{position:"absolute","pointer-events":"auto",cursor:"pointer",transition:"opacity 0.2s linear"},
!0);var b={opacity:"0.05",cursor:"auto"};e.k()&&(b.display="none");e.f(m.b.w+".disabled",b,!0);var c,d,g,f;for(c in a.i)d="left"===c||"right"===c,b="up"===c?"top":"down"===c?"bottom":c,g=d?"top":"left",f={width:d?"22px":"16px",height:d?"16px":"22px","tap-highlight-color":"rgba(0, 0, 0, 0)","touch-callout":"none","user-select":"none"},f[b]="0",f[g]="50%",f["margin-"+g]="-8px",e.f(m.b.w+"."+c,f,!0),f={width:"0",height:"0",content:'""',position:"absolute",border:"8px solid transparent"},f["border-"+
l.I(b)+"-width"]="12px",f["border-"+b+"-width"]="10px",f["border-"+l.I(b)+"-color"]=a.d.theme,f[b]="0",f[g]="50%",f["margin-"+g]="-8px",e.f(m.b.id(a,!0)+" ."+m.b.i+"."+c+":after",f,!0),f={},f[d?"height":"width"]="100%",f[g]="0",f["margin-"+g]="0",e.f(m.b.r+".border ."+m.b.i+"."+c,f,!0),d={},d[b]=h(a.a,"padding-"+b)+"px",e.f(m.b.id(a,!0)+".border ."+m.b.i+"."+c,d,!0)},onclick:function(a){return function(b){q.s(a,D(e.o(b).target,m.b.data))}},update:function(a){for(var b in a.i)v(a.i[b],q.N(a,b)?"rm":
"add","disabled")}},p={b:e.$("breadcrumbs"),G:function(a){a.a&&!a.h&&(a.h=h(v(y("aside",{id:p.b.id(a)}),"add","disabled"),{opacity:"0",filter:"alpha(opacity=0)","z-index":"0","pointer-events":"none",visibility:"hidden"}),p.t(a),a.a.appendChild(a.h),w(a.h,"click",p.onclick(a)))},t:function(a){e.f(p.b.r,{position:"absolute",bottom:h(a.a,"padding-bottom")+"px",right:h(a.a,"padding-right")+"px",padding:"10px","box-sizing":"border-box",transform:"translateZ(9999px)"},!0);e.f(p.b.r+".disabled",{transform:"translateZ(0px) !important"},
!0);e.f(p.b.w,{padding:"0","font-size":"0","line-height":"0"},!0);e.f(p.b.w+" li",{width:"10px",height:"10px",display:"inline-block",margin:"3px","tap-highlight-color":"rgba(0, 0, 0, 0)","touch-callout":"none","user-select":"none"},!0);e.f(p.b.id(a,!0)+" ."+p.b.i+" li.normal",{"border-radius":"100%",border:"1px "+a.d.theme+" solid",cursor:"pointer","pointer-events":"auto"},!0);e.f(p.b.id(a,!0)+" ."+p.b.i+" li.active",{width:"12px",height:"12px",margin:"2px","background-color":a.d.theme},!0)},onclick:function(a){return function(b){q.s(a,
D(e.o(b).target,p.b.data))}},V:{right:{x:1,y:0},up:{x:0,y:1},left:{x:-1,y:0},down:{x:0,y:-1}},find:function(a,b,c,d,g,e){if(d){b[d]||(b[d]={x:g,y:e},g<c.x.min&&(c.x.min=g),g>c.x.max&&(c.x.max=g),e<c.y.min&&(c.y.min=e),e>c.y.max&&(c.y.max=e));d=l.get(a,d);for(var h in p.V)d[h]&&!b[d[h]]&&p.find(a,b,c,d[h],g+p.V[h].x,e+p.V[h].y)}},update:function(a,b,c){v(a.D[b].m,"in"===c?"add":"rm","active")},create:function(a){p.G(a);if(a.h){var b={},c={x:{min:0,max:0},y:{min:0,max:0}};p.find(a,b,c,a.start,0,0);
c.x.U=0-c.x.min;c.y.U=0-c.y.min;var d={},e;for(e in b)b[e].x+=c.x.U,b[e].y+=c.y.U,d[b[e].x+","+b[e].y]=e;for(var f=c.y.max-c.y.min+1,c=c.x.max-c.x.min+1;a.h.firstChild;)a.h.removeChild(a.h.firstChild);e=v(y("ul"),"add",p.b.i);for(var h=y("li"),f=f-1,n;0<=f;f--){n=e.cloneNode(!1);for(var k=0,l,m;k<c;k++){l=h.cloneNode(!1);if(m=d[k+","+f]){v(l,"add","normal",m===a.c?"active":null);var q=l;q&&q.setAttribute&&q.setAttribute(p.b.data,m);b[m].m=l}n.appendChild(l)}a.h.appendChild(n)}a.D=b}}},L={none:!0,
fade:e.supports("animation","opacity"),linear:e.supports("animation","opacity","transform"),cube:e.supports("animation","backface-visibility","opacity","transform","transform-style")};e.add.fade("slidr-fade-in","0","1");e.add.fade("slidr-fade-out","1","0");var u={G:function(a,b){var c=l.get(a,b);if(!c.sa){var d=h(c.m,"display"),d={display:"none"===d?"block":d,visibility:"hidden",position:"absolute",opacity:"0",filter:"alpha(opacity=0)","z-index":"0","pointer-events":"none","backface-visibility":"hidden",
"transform-style":"preserve-3d"};e.k()&&(d=A(d,{display:"none",visibility:"visible"}));c.sa=!0;h(c.m,d)}},ka:L,la:{fade:void 0,linear:{"in":{left:function(a,b,c){e.add.linear(a,"in","X(-"+b,"X(0",c,"1")},right:function(a,b,c){e.add.linear(a,"in","X("+b,"X(0",c,"1")},up:function(a,b,c){e.add.linear(a,"in","Y(-"+b,"Y(0",c,"1")},down:function(a,b,c){e.add.linear(a,"in","Y("+b,"Y(0",c,"1")}},out:{left:function(a,b,c){e.add.linear(a,"out","X(0","X("+b,"1",c)},right:function(a,b,c){e.add.linear(a,"out",
"X(0","X(-"+b,"1",c)},up:function(a,b,c){e.add.linear(a,"out","Y(0","Y("+b,"1",c)},down:function(a,b,c){e.add.linear(a,"out","Y(0","Y(-"+b,"1",c)}}},cube:{"in":{left:function(a,b,c){e.add.cube(a,"Y(-9","Y(",b/2,c,"1")},right:function(a,b,c){e.add.cube(a,"Y(9","Y(",b/2,c,"1")},up:function(a,b,c){e.add.cube(a,"X(9","X(",b/2,c,"1")},down:function(a,b,c){e.add.cube(a,"X(-9","X(",b/2,c,"1")}},out:{left:function(a,b,c){e.add.cube(a,"Y(","Y(9",b/2,"1",c)},right:function(a,b,c){e.add.cube(a,"Y(","Y(-9",b/
2,"1",c)},up:function(a,b,c){e.add.cube(a,"X(","X(-9",b/2,"1",c)},down:function(a,b,c){e.add.cube(a,"X(","X(9",b/2,"1",c)}}}},name:function(a,b,c,d,e){var f=["slidr",c,d];if(("linear"===c||"cube"===c)&&e){f.push(e);a=a.d.fade?"0":"1";"0"===a&&f.push("fade");var h="up"===e||"down"===e?"h":"w";b="h"===h?k.ea(b):k.fa(b);f.push(h,b);(c=G(u.la,[c,d,e]))&&c(f.join("-"),b,a)}return f.join("-")},B:function(a,b,c,d,g,f,k,n){k={opacity:"in"===d?"1":"0",filter:"alpha(opacity="+("in"===d?"100":"0")+")","z-index":k||
("in"===d?"1":"0"),visibility:"in"===d?"visible":"hidden","pointer-events":n||("in"===d?"auto":"none")};e.k()&&(k=A(k,{display:"in"===d?"block":"none",visibility:"visible"}));f=f||l.get(a,b).m;n=a.d.timing[c];u.ka[c]&&n&&(g=u.name(a,f,c,d,g),k.animation="none"===c?"none":[g,n].join(" "));h(f,k);l.get(a,b)&&e.supports("transform")&&u.da(a,f,d)},da:function(a,b,c){b=b.getElementsByTagName("aside");if(b.length)for(var d=0,e,f;e=b[d];d++)if(e.getAttribute("id")){for(f=e.parentNode;!D(f,"data-slidr")&&
"body"!==(f.tagName?f.tagName.toLowerCase():null);)f=f.parentNode;"body"===(f.tagName?f.tagName.toLowerCase():null)&&(f=a.a);f=h(f,"visibility");(f="out"===c||!c&&"hidden"===f?"add":"visible"===f?"rm":null)&&v(e,f,"disabled")}}},k={l:{},ma:function(a){k.l[a.id]={src:a,X:0,R:0,ba:k.oa(a)}},oa:function(a){var b=h(a.a.cloneNode(!1),{position:"absolute",opacity:"0",filter:"alpha(opacity=0)"}),c=h(y("div"),{width:"42px",height:"42px"});b.appendChild(c);a.a.parentNode.insertBefore(b,a.a);var c=(z(b)?k.Q(a.a):
0)+42,d=(z(b)?k.P(a.a):0)+42,e=h(b,"width"),f=h(b,"height"),l=h(b,"min-width"),n=h(b,"min-height"),c={width:"auto"===e||e===c||0!==l&&"auto"!=l,height:"auto"===f||f===d||0!==n&&"auto"!=n};a.a.parentNode.removeChild(b);return c},p:function(){for(var a=0,b=0,c;c=arguments[a];a++)b+=c;return isNaN(b)?0:b},ya:function(a){return k.p(Math.max(0,h(a,"margin-left")),Math.max(0,h(a,"margin-right")))},qa:function(a){return k.p(Math.max(0,h(a,"margin-top")),Math.max(0,h(a,"margin-bottom")))},za:function(a){return k.p(h(a,
"padding-left"),h(a,"padding-right"))},ra:function(a){return k.p(h(a,"padding-top"),h(a,"padding-bottom"))},xa:function(a){return k.p(h(a,"border-left-width"),h(a,"border-right-width"))},pa:function(a){return k.p(h(a,"border-top-width"),h(a,"border-bottom-width"))},Q:function(a){return k.p(k.za(a),k.xa(a))},P:function(a){return k.p(k.ra(a),k.pa(a))},fa:function(a){var b=h(a,"width");e.k()&&"auto"===b&&a.clientWidth&&(b=a.clientWidth);"auto"!==b&&(b+=k.ya(a)+(z(a)?0:k.Q(a)));return b},ea:function(a){var b=
h(a,"height");e.k()&&"auto"===b&&a.clientHeight&&(b=a.clientHeight);"auto"!==b&&(b+=k.qa(a)+(z(a)?0:k.P(a)));return b},ia:function(a,b){var c=b;"auto"!==b&&""!==b&&(c=b+(z(a)?k.Q(a):0)+"px");h(a,{width:c});return b},ha:function(a,b){var c=b;"auto"!==b&&""!==b&&(c=b+(z(a)?k.P(a):0)+"px");h(a,{height:c});return b}},s={g:{n:[],S:function(a){return 0<=x(s.g.n,a)},add:function(a){s.g.S(a)||s.g.n.push(a)},remove:function(a){s.g.S(a)&&s.g.n.splice(x(s.g.n,a),1)},c:function(){for(var a=s.g.n[s.g.n.length-
1],b=0,c=s.g.n.length,d=s.g.n[b];b<c;b++)I(a,d)&&(a=d);return a},wa:function(a){w(a,"mouseenter",function(a){s.g.add(e.o(a).currentTarget.id)});w(a,"mouseleave",function(a){s.g.remove(e.o(a).currentTarget.id)})}},Aa:function(){w(document,"keydown",function(a){a=e.o(a);if(s.g.c()&&40>=a.which&&37<=a.which){var b=B[s.g.c()],c=null;40===a.which&&b.canSlide("down")?c="down":39===a.which&&b.canSlide("right")?c="right":38===a.which&&b.canSlide("up")?c="up":37===a.which&&b.canSlide("left")&&(c="left");c&&
b.slide(c)&&e.stop(a)}})}(),va:function(a){var b,c,d,g,f,h;w(a.a,"touchstart",function(a){a=e.o(a);b=a.touches[0].pageX;c=a.touches[0].pageY;d=+new Date;h=f=g=0});w(a.a,"touchmove",function(a){a=e.o(a);1<a.touches.length||a.scale&&1!==a.scale||(g=a.touches[0].pageX-b,f=a.touches[0].pageY-c,h=+new Date-d,100<h&&0.25>(Math.abs(g)+Math.abs(f))/h||e.stop(a))});w(a.a,"touchend",function(b){b=e.o(b);if(250>Number(+new Date-d)){var c=Math.abs(g),h=Math.abs(f),k=20<c,l=20<h,m=0>g?"right":"left",p=0>f?"down":
"up";(c=k&&l?c>h?m:p:k?m:l?p:null)&&q.s(a,c);e.stop(b)}})}},q={start:function(a,b){if(!a.u&&a.a){var c=h(a.a,"display"),d=h(a.a,"position"),e=h(a.a,"opacity");h(a.a,{visibility:"visible",opacity:e,filter:"alpha(opacity="+100*e+")",display:"inline-block"===c||"inline"===c?"inline-block":"block",position:"static"===d?"relative":d,overflow:a.d.overflow?h(a.a,"overflow"):"hidden",transition:"height 0.05s ease-out, width 0.05s ease-out","tap-highlight-color":"rgba(0, 0, 0, 0)","touch-callout":"none"});
a.start||q.add(a,a.d.direction,l.find(a,!0),a.d.transition);l.get(a,b)&&(a.start=b);l.display(a);k.ma(a);u.da(a,a.a);a.d.keyboard&&s.g.wa(a.a);a.d.touch&&s.va(a);a.u=!0;m.update(a)}},N:function(a,b){return a.u&&b&&(l.H(b)?!!l.get(a,a.c,b):!!l.get(a,b))},s:function(a,b){q.N(a,b)&&l.s(a,b)},add:function(a,b,c,d,e){if(a.a){d=t.L(a,d);var f=l.find(a),h="horizontal"===b||"h"===b?"left":"up",k="horizontal"===b||"h"===b?"right":"down";l.L(a,c,d,f,h,k)||e?l.add(a,c,d,f,h,k):console.warn("[Slidr] Error adding ["+
b+"] slides for ["+a.id+"].")}},j:function(a,b,c){a.u&&l.H(c)&&(q.stop(a),a.j.ga=b,a.j.direction=c,a.j.id=setInterval(function(){a.d.pause&&s.g.S(a.id)||l.s(a,c)},b))},stop:function(a){a.u&&a.j.id&&(clearInterval(a.j.id),a.j.id=null)},h:function(a){if(a.h&&a.v){var b="0"===h(a.h,"opacity")?"in":"out";u.B(a,null,"fade",b,null,a.h,"3","none");a.controls&&v(a.controls,"in"===b?"add":"rm","breadcrumbs")}},controls:function(a,b){if(a.controls&&a.v){m.valid(b)||(b=null);var c="hidden"===h(a.controls,"visibility"),
d=b&&"none"!==b?"in":"out";"out"===d&&c||("border"===b?v(a.controls,"add","border"):"corner"===b&&v(a.controls,"rm","border"),u.B(a,null,"fade",d,null,a.controls,"2","none"))}}};setInterval(function b(){var c,d,g,f,m;for(g in k.l)(d=k.l[g],c=d.src,e.k()||I(document,c.a))?"hidden"===h(c.a,"visibility")?(k.l[g].X=k.ia(c.a,0),k.l[g].R=k.ha(c.a,0)):l.get(c,c.c)&&(f=l.get(c,c.c).m,m=k.fa(f),f=k.ea(f),d.ba.width&&d.X!=m&&(k.l[g].X=k.ia(c.a,m)),d.ba.height&&d.R!=f&&(k.l[g].R=k.ha(c.a,f))):(delete k.l[g],
delete B[c.id]);return b}(),250);var B={},M={after:H,before:H,breadcrumbs:!1,controls:"border",direction:"horizontal",fade:!0,keyboard:!1,overflow:!1,pause:!1,theme:"#fff",timing:{},touch:!1,transition:"linear"},N={none:"none",fade:"0.4s ease-out",linear:"0.6s ease-out",cube:"1s cubic-bezier(0.15, 0.9, 0.25, 1)"};return{version:function(){return"0.5.0"},transitions:function(){return t.Z.slice(0)},create:function(b,c){var d=document.getElementById(b);if(d){var e=A(M,c||{});e.timing=A(N,e.timing);B[b]=
B[b]||new K(b,d,e);return B[b]}console.warn("[Slidr] Could not find element with id ["+b+"].")}}}"object"===typeof exports?module.exports=E():"function"===typeof define&&define.amd?define(E):this.slidr=E();


//Creating jQuery Plugin for Tertiary Slider Pages
(function() {
 $.fn.slide = function(options) {
                var _ = this;
                return _.each(function(index, element) {
                    element.slide = new Slide(element, options);
                });
            }

    function Slide(elem, settings) {
        var $elem = $(elem),
            numSlides = $elem.children().length,
            ctrlString='',
            $ctrl = $($.parseHTML('<ul class="slideshow-ctrls"></ul>'));

            for (var i=0; i<numSlides; i++) {               
              if(i===0) {ctrlString += '<li data-id="'+i+'" class="active"></li>';}
              else {ctrlString += '<li data-id="'+i+'"></li>';}
            }

            $ctrl.append(ctrlString);  $elem.append($ctrl);

        var $slides = $elem.children(),
            $slidesctrls = $ctrl.children();        

        //Slider
        $ctrl.on('click', function(e) {
            e.stopPropagation();
            var $el = $(e.target);
            if ( $el.data('id') >= 0 ) {
                $slides.removeClass('active');
                $slidesctrls.removeClass('active');

                $el.addClass('active');
                $slides.eq( $el.data('id') ).addClass('active');
            }
        });
    }
})(); 


//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return Bb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){vb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return o(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){sc[a]||(e(b),sc[a]=!0)}function h(a,b){return function(c){return r(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function k(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function l(){}function m(a,b){b!==!1&&H(a),p(this,a),this._d=new Date(+a._d),uc===!1&&(uc=!0,vb.updateOffset(this),uc=!1)}function n(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=vb.localeData(),this._bubble()}function o(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function p(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Kb.length>0)for(c in Kb)d=Kb[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function s(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function t(a,b){var c;return b=M(b,a),a.isBefore(b)?c=s(a,b):(c=s(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function u(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=vb.duration(c,d),v(this,e,a),this}}function v(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&pb(a,"Date",ob(a,"Date")+f*c),g&&nb(a,ob(a,"Month")+g*c),d&&vb.updateOffset(a,f||g)}function w(a){return"[object Array]"===Object.prototype.toString.call(a)}function x(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function y(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&C(a[d])!==C(b[d]))&&g++;return g+f}function z(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=lc[a]||mc[b]||b}return a}function A(a){var b,d,e={};for(d in a)c(a,d)&&(b=z(d),b&&(e[b]=a[d]));return e}function B(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}vb[b]=function(e,f){var g,h,i=vb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=vb().utc().set(d,a);return i.call(vb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function C(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function D(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function E(a,b,c){return jb(vb([a,11,31+b-c]),b,c).week}function F(a){return G(a)?366:365}function G(a){return a%4===0&&a%100!==0||a%400===0}function H(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Db]<0||a._a[Db]>11?Db:a._a[Eb]<1||a._a[Eb]>D(a._a[Cb],a._a[Db])?Eb:a._a[Fb]<0||a._a[Fb]>24||24===a._a[Fb]&&(0!==a._a[Gb]||0!==a._a[Hb]||0!==a._a[Ib])?Fb:a._a[Gb]<0||a._a[Gb]>59?Gb:a._a[Hb]<0||a._a[Hb]>59?Hb:a._a[Ib]<0||a._a[Ib]>999?Ib:-1,a._pf._overflowDayOfYear&&(Cb>b||b>Eb)&&(b=Eb),a._pf.overflow=b)}function I(b){return null==b._isValid&&(b._isValid=!isNaN(b._d.getTime())&&b._pf.overflow<0&&!b._pf.empty&&!b._pf.invalidMonth&&!b._pf.nullInput&&!b._pf.invalidFormat&&!b._pf.userInvalidated,b._strict&&(b._isValid=b._isValid&&0===b._pf.charsLeftOver&&0===b._pf.unusedTokens.length&&b._pf.bigHour===a)),b._isValid}function J(a){return a?a.toLowerCase().replace("_","-"):a}function K(a){for(var b,c,d,e,f=0;f<a.length;){for(e=J(a[f]).split("-"),b=e.length,c=J(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=L(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&y(e,c,!0)>=b-1)break;b--}f++}return null}function L(a){var b=null;if(!Jb[a]&&Lb)try{b=vb.locale(),require("./locale/"+a),vb.locale(b)}catch(c){}return Jb[a]}function M(a,b){var c,d;return b._isUTC?(c=b.clone(),d=(vb.isMoment(a)||x(a)?+a:+vb(a))-+c,c._d.setTime(+c._d+d),vb.updateOffset(c,!1),c):vb(a).local()}function N(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function O(a){var b,c,d=a.match(Pb);for(b=0,c=d.length;c>b;b++)d[b]=rc[d[b]]?rc[d[b]]:N(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function P(a,b){return a.isValid()?(b=Q(b,a.localeData()),nc[b]||(nc[b]=O(b)),nc[b](a)):a.localeData().invalidDate()}function Q(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Qb.lastIndex=0;d>=0&&Qb.test(a);)a=a.replace(Qb,c),Qb.lastIndex=0,d-=1;return a}function R(a,b){var c,d=b._strict;switch(a){case"Q":return _b;case"DDDD":return bc;case"YYYY":case"GGGG":case"gggg":return d?cc:Tb;case"Y":case"G":case"g":return ec;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?dc:Ub;case"S":if(d)return _b;case"SS":if(d)return ac;case"SSS":if(d)return bc;case"DDD":return Sb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Wb;case"a":case"A":return b._locale._meridiemParse;case"x":return Zb;case"X":return $b;case"Z":case"ZZ":return Xb;case"T":return Yb;case"SSSS":return Vb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?ac:Rb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Rb;case"Do":return d?b._locale._ordinalParse:b._locale._ordinalParseLenient;default:return c=new RegExp($(Z(a.replace("\\","")),"i"))}}function S(a){a=a||"";var b=a.match(Xb)||[],c=b[b.length-1]||[],d=(c+"").match(jc)||["-",0,0],e=+(60*d[1])+C(d[2]);return"+"===d[0]?e:-e}function T(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Db]=3*(C(b)-1));break;case"M":case"MM":null!=b&&(e[Db]=C(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b,a,c._strict),null!=d?e[Db]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Eb]=C(b));break;case"Do":null!=b&&(e[Eb]=C(parseInt(b.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=C(b));break;case"YY":e[Cb]=vb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Cb]=C(b);break;case"a":case"A":c._meridiem=b;break;case"h":case"hh":c._pf.bigHour=!0;case"H":case"HH":e[Fb]=C(b);break;case"m":case"mm":e[Gb]=C(b);break;case"s":case"ss":e[Hb]=C(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Ib]=C(1e3*("0."+b));break;case"x":c._d=new Date(C(b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=S(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=C(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=vb.parseTwoDigitYear(b)}}function U(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Cb],jb(vb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Cb],jb(vb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=kb(d,e,f,h,g),a._a[Cb]=i.year,a._dayOfYear=i.dayOfYear}function V(a){var c,d,e,f,g=[];if(!a._d){for(e=X(a),a._w&&null==a._a[Eb]&&null==a._a[Db]&&U(a),a._dayOfYear&&(f=b(a._a[Cb],e[Cb]),a._dayOfYear>F(f)&&(a._pf._overflowDayOfYear=!0),d=fb(f,0,a._dayOfYear),a._a[Db]=d.getUTCMonth(),a._a[Eb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];24===a._a[Fb]&&0===a._a[Gb]&&0===a._a[Hb]&&0===a._a[Ib]&&(a._nextDay=!0,a._a[Fb]=0),a._d=(a._useUTC?fb:eb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Fb]=24)}}function W(a){var b;a._d||(b=A(a._i),a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],V(a))}function X(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function Y(b){if(b._f===vb.ISO_8601)return void ab(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Q(b._f,b._locale).match(Pb)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(R(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),rc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),T(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[Fb]<=12&&(b._pf.bigHour=a),b._a[Fb]=k(b._locale,b._a[Fb],b._meridiem),V(b),H(b)}function Z(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function $(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function _(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=p({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],Y(b),I(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));o(a,c||b)}function ab(a){var b,c,d=a._i,e=fc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=hc.length;c>b;b++)if(hc[b][1].exec(d)){a._f=hc[b][0]+(e[6]||" ");break}for(b=0,c=ic.length;c>b;b++)if(ic[b][1].exec(d)){a._f+=ic[b][0];break}d.match(Xb)&&(a._f+="Z"),Y(a)}else a._isValid=!1}function bb(a){ab(a),a._isValid===!1&&(delete a._isValid,vb.createFromInputFallback(a))}function cb(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function db(b){var c,d=b._i;d===a?b._d=new Date:x(d)?b._d=new Date(+d):null!==(c=Mb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?bb(b):w(d)?(b._a=cb(d.slice(0),function(a){return parseInt(a,10)}),V(b)):"object"==typeof d?W(b):"number"==typeof d?b._d=new Date(d):vb.createFromInputFallback(b)}function eb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function fb(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function gb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function hb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function ib(a,b,c){var d=vb.duration(a).abs(),e=Ab(d.as("s")),f=Ab(d.as("m")),g=Ab(d.as("h")),h=Ab(d.as("d")),i=Ab(d.as("M")),j=Ab(d.as("y")),k=e<oc.s&&["s",e]||1===f&&["m"]||f<oc.m&&["mm",f]||1===g&&["h"]||g<oc.h&&["hh",g]||1===h&&["d"]||h<oc.d&&["dd",h]||1===i&&["M"]||i<oc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,hb.apply({},k)}function jb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=vb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function kb(a,b,c,d,e){var f,g,h=fb(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:F(a-1)+g}}function lb(b){var c,d=b._i,e=b._f;return b._locale=b._locale||vb.localeData(b._l),null===d||e===a&&""===d?vb.invalid({nullInput:!0}):("string"==typeof d&&(b._i=d=b._locale.preparse(d)),vb.isMoment(d)?new m(d,!0):(e?w(e)?_(b):Y(b):db(b),c=new m(b),c._nextDay&&(c.add(1,"d"),c._nextDay=a),c))}function mb(a,b){var c,d;if(1===b.length&&w(b[0])&&(b=b[0]),!b.length)return vb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function nb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),D(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function ob(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function pb(a,b,c){return"Month"===b?nb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function qb(a,b){return function(c){return null!=c?(pb(this,a,c),vb.updateOffset(this,b),this):ob(this,a)}}function rb(a){return 400*a/146097}function sb(a){return 146097*a/400}function tb(a){vb.duration.fn[a]=function(){return this._data[a]}}function ub(a){"undefined"==typeof ender&&(wb=zb.moment,zb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",vb):vb)}for(var vb,wb,xb,yb="2.9.0",zb="undefined"==typeof global||"undefined"!=typeof window&&window!==global.window?this:global,Ab=Math.round,Bb=Object.prototype.hasOwnProperty,Cb=0,Db=1,Eb=2,Fb=3,Gb=4,Hb=5,Ib=6,Jb={},Kb=[],Lb="undefined"!=typeof module&&module&&module.exports,Mb=/^\/?Date\((\-?\d+)/i,Nb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ob=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Pb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Qb=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Rb=/\d\d?/,Sb=/\d{1,3}/,Tb=/\d{1,4}/,Ub=/[+\-]?\d{1,6}/,Vb=/\d+/,Wb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Xb=/Z|[\+\-]\d\d:?\d\d/gi,Yb=/T/i,Zb=/[\+\-]?\d+/,$b=/[\+\-]?\d+(\.\d{1,3})?/,_b=/\d/,ac=/\d\d/,bc=/\d{3}/,cc=/\d{4}/,dc=/[+-]?\d{6}/,ec=/[+-]?\d+/,fc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,gc="YYYY-MM-DDTHH:mm:ssZ",hc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],ic=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],jc=/([\+\-]|\d\d)/gi,kc=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),lc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},mc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},nc={},oc={s:45,m:45,h:22,d:26,M:11},pc="DDD w W M D d".split(" "),qc="M D H h m s w W".split(" "),rc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return r(this.year()%100,2)},YYYY:function(){return r(this.year(),4)},YYYYY:function(){return r(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+r(Math.abs(a),6)},gg:function(){return r(this.weekYear()%100,2)},gggg:function(){return r(this.weekYear(),4)},ggggg:function(){return r(this.weekYear(),5)},GG:function(){return r(this.isoWeekYear()%100,2)},GGGG:function(){return r(this.isoWeekYear(),4)},GGGGG:function(){return r(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return C(this.milliseconds()/100)},SS:function(){return r(C(this.milliseconds()/10),2)},SSS:function(){return r(this.milliseconds(),3)},SSSS:function(){return r(this.milliseconds(),3)},Z:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+":"+r(C(a)%60,2)},ZZ:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+r(C(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},sc={},tc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"],uc=!1;pc.length;)xb=pc.pop(),rc[xb+"o"]=i(rc[xb],xb);for(;qc.length;)xb=qc.pop(),rc[xb+xb]=h(rc[xb],2);rc.DDDD=h(rc.DDD,3),o(l.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=vb.utc([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=vb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.apply(b,[c]):d},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(a){return a},postformat:function(a){return a},week:function(a){return jb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},firstDayOfWeek:function(){return this._week.dow},firstDayOfYear:function(){return this._week.doy},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),vb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),lb(g)},vb.suppressDeprecationWarnings=!1,vb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),vb.min=function(){var a=[].slice.call(arguments,0);return mb("isBefore",a)},vb.max=function(){var a=[].slice.call(arguments,0);return mb("isAfter",a)},vb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),lb(g).utc()},vb.unix=function(a){return vb(1e3*a)},vb.duration=function(a,b){var d,e,f,g,h=a,i=null;return vb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Nb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:C(i[Eb])*d,h:C(i[Fb])*d,m:C(i[Gb])*d,s:C(i[Hb])*d,ms:C(i[Ib])*d}):(i=Ob.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):null==h?h={}:"object"==typeof h&&("from"in h||"to"in h)&&(g=t(vb(h.from),vb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new n(h),vb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},vb.version=yb,vb.defaultFormat=gc,vb.ISO_8601=function(){},vb.momentProperties=Kb,vb.updateOffset=function(){},vb.relativeTimeThreshold=function(b,c){return oc[b]===a?!1:c===a?oc[b]:(oc[b]=c,!0)},vb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return vb.locale(a,b)}),vb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?vb.defineLocale(a,b):vb.localeData(a),c&&(vb.duration._locale=vb._locale=c)),vb._locale._abbr},vb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Jb[a]||(Jb[a]=new l),Jb[a].set(b),vb.locale(a),Jb[a]):(delete Jb[a],null)},vb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return vb.localeData(a)}),vb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return vb._locale;if(!w(a)){if(b=L(a))return b;a=[a]}return K(a)},vb.isMoment=function(a){return a instanceof m||null!=a&&c(a,"_isAMomentObject")},vb.isDuration=function(a){return a instanceof n};for(xb=tc.length-1;xb>=0;--xb)B(tc[xb]);vb.normalizeUnits=function(a){return z(a)},vb.invalid=function(a){var b=vb.utc(0/0);return null!=a?o(b._pf,a):b._pf.userInvalidated=!0,b},vb.parseZone=function(){return vb.apply(null,arguments).parseZone()},vb.parseTwoDigitYear=function(a){return C(a)+(C(a)>68?1900:2e3)},vb.isDate=x,o(vb.fn=m.prototype,{clone:function(){return vb(this)},valueOf:function(){return+this._d-6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=vb(this).utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():P(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):P(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return I(this)},isDSTShifted:function(){return this._a?this.isValid()&&y(this._a,(this._isUTC?vb.utc(this._a):vb(this._a)).toArray())>0:!1},parsingFlags:function(){return o({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.utcOffset(0,a)},local:function(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(this._dateUtcOffset(),"m")),this},format:function(a){var b=P(this,a||vb.defaultFormat);return this.localeData().postformat(b)},add:u(1,"add"),subtract:u(-1,"subtract"),diff:function(a,b,c){var d,e,f=M(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=j(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:q(e)},from:function(a,b){return vb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(vb(),a)},calendar:function(a){var b=a||vb(),c=M(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,vb(b)))},isLeapYear:function(){return G(this.year())},isDST:function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=gb(a,this.localeData()),this.add(a-b,"d")):b},month:qb("Month",!0),startOf:function(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(b){return b=z(b),b===a||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")},isAfter:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this>+a):(c=vb.isMoment(a)?+a:+vb(a),c<+this.clone().startOf(b))},isBefore:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+a>+this):(c=vb.isMoment(a)?+a:+vb(a),+this.clone().endOf(b)<c)},isBetween:function(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)},isSame:function(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this===+a):(c=+vb(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),a>this?this:a}),zone:f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",function(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}),utcOffset:function(a,b){var c,d=this._offset||0;return null!=a?("string"==typeof a&&(a=S(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateUtcOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.add(c,"m"),d!==a&&(!b||this._changeInProgress?v(this,vb.duration(a-d,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,vb.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?d:this._dateUtcOffset()},isLocal:function(){return!this._isUTC},isUtcOffset:function(){return this._isUTC},isUtc:function(){return this._isUTC&&0===this._offset},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(S(this._i)),this},hasAlignedHourOffset:function(a){return a=a?vb(a).utcOffset():0,(this.utcOffset()-a)%60===0},daysInMonth:function(){return D(this.year(),this.month())},dayOfYear:function(a){var b=Ab((vb(this).startOf("day")-vb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=jb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=jb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=jb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return E(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return E(this.year(),a.dow,a.doy)},get:function(a){return a=z(a),this[a]()},set:function(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else a=z(a),"function"==typeof this[a]&&this[a](b);return this},locale:function(b){var c;return b===a?this._locale._abbr:(c=vb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateUtcOffset:function(){return 15*-Math.round(this._d.getTimezoneOffset()/15)}}),vb.fn.millisecond=vb.fn.milliseconds=qb("Milliseconds",!1),vb.fn.second=vb.fn.seconds=qb("Seconds",!1),vb.fn.minute=vb.fn.minutes=qb("Minutes",!1),vb.fn.hour=vb.fn.hours=qb("Hours",!0),vb.fn.date=qb("Date",!0),vb.fn.dates=f("dates accessor is deprecated. Use date instead.",qb("Date",!0)),vb.fn.year=qb("FullYear",!0),vb.fn.years=f("years accessor is deprecated. Use year instead.",qb("FullYear",!0)),vb.fn.days=vb.fn.day,vb.fn.months=vb.fn.month,vb.fn.weeks=vb.fn.week,vb.fn.isoWeeks=vb.fn.isoWeek,vb.fn.quarters=vb.fn.quarter,vb.fn.toJSON=vb.fn.toISOString,vb.fn.isUTC=vb.fn.isUtc,o(vb.duration.fn=n.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=q(d/1e3),g.seconds=a%60,b=q(a/60),g.minutes=b%60,c=q(b/60),g.hours=c%24,e+=q(c/24),h=q(rb(e)),e-=q(sb(h)),f+=q(e/30),e%=30,h+=q(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return q(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*C(this._months/12)
},humanize:function(a){var b=ib(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=vb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=vb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=z(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=z(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*rb(b),"month"===a?c:c/12;switch(b=this._days+Math.round(sb(this._months/12)),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:vb.fn.lang,locale:vb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale},toJSON:function(){return this.toISOString()}}),vb.duration.fn.toString=vb.duration.fn.toISOString;for(xb in kc)c(kc,xb)&&tb(xb.toLowerCase());vb.duration.fn.asMilliseconds=function(){return this.as("ms")},vb.duration.fn.asSeconds=function(){return this.as("s")},vb.duration.fn.asMinutes=function(){return this.as("m")},vb.duration.fn.asHours=function(){return this.as("h")},vb.duration.fn.asDays=function(){return this.as("d")},vb.duration.fn.asWeeks=function(){return this.as("weeks")},vb.duration.fn.asMonths=function(){return this.as("M")},vb.duration.fn.asYears=function(){return this.as("y")},vb.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===C(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Lb?module.exports=vb:"function"==typeof define&&define.amd?(define(function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(zb.moment=wb),vb}),ub(!0)):ub()}).call(this);


// jQuery Mask Plugin v1.10.12
// github.com/igorescobar/jQuery-Mask-Plugin
(function(a){"function"===typeof define&&define.amd?define(["jquery"],a):a(window.jQuery||window.Zepto)})(function(a){var y=function(b,e,d){b=a(b);var g=this,k=b.val(),n;e="function"===typeof e?e(b.val(),void 0,b,d):e;var c={invalid:[],getCaret:function(){try{var h,q=0,c=b.get(0),f=document.selection,a=c.selectionStart;if(f&&!~navigator.appVersion.indexOf("MSIE 10"))h=f.createRange(),h.moveStart("character",b.is("input")?-b.val().length:-b.text().length),q=h.text.length;else if(a||"0"===a)q=a;return q}catch(e){}},
setCaret:function(h){try{if(b.is(":focus")){var q,a=b.get(0);a.setSelectionRange?a.setSelectionRange(h,h):a.createTextRange&&(q=a.createTextRange(),q.collapse(!0),q.moveEnd("character",h),q.moveStart("character",h),q.select())}}catch(f){}},events:function(){b.on("keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){k===b.val()||b.data("changed")||b.trigger("change");
b.data("changed",!1)}).on("keydown.mask, blur.mask",function(){k=b.val()}).on("focusout.mask",function(){d.clearIfNotMatch&&!n.test(c.val())&&c.val("")})},getRegexMask:function(){for(var h=[],b,a,f,c,d=0;d<e.length;d++)(b=g.translation[e[d]])?(a=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,(b=b.recursive)?(h.push(e[d]),c={digit:e[d],pattern:a}):h.push(f||b?a+"?":a)):h.push(e[d].replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));h=h.join("");c&&(h=h.replace(RegExp("("+c.digit+"(.*"+c.digit+
")?)"),"($1)?").replace(RegExp(c.digit,"g"),c.pattern));return RegExp(h)},destroyEvents:function(){b.off("keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(h){var a=b.is("input")?"val":"text";if(0<arguments.length){if(b[a]()!==h)b[a](h);a=b}else a=b[a]();return a},getMCharsBeforeCount:function(a,b){for(var c=0,f=0,d=e.length;f<d&&f<a;f++)g.translation[e.charAt(f)]||(a=b?a+1:a,c++);return c},caretPos:function(a,b,d,f){return g.translation[e.charAt(Math.min(a-1,e.length-
1))]?Math.min(a+d-b-f,d):c.caretPos(a+1,b,d,f)},behaviour:function(b){b=b||window.event;c.invalid=[];var d=b.keyCode||b.which;if(-1===a.inArray(d,g.byPassKeys)){var e=c.getCaret(),f=c.val().length,p=e<f,l=c.getMasked(),k=l.length,m=c.getMCharsBeforeCount(k-1)-c.getMCharsBeforeCount(f-1);c.val(l);!p||65===d&&b.ctrlKey||(8!==d&&46!==d&&(e=c.caretPos(e,f,k,m)),c.setCaret(e));return c.callbacks(b)}},getMasked:function(a){var b=[],k=c.val(),f=0,p=e.length,l=0,n=k.length,m=1,t="push",u=-1,s,w;d.reverse?
(t="unshift",m=-1,s=0,f=p-1,l=n-1,w=function(){return-1<f&&-1<l}):(s=p-1,w=function(){return f<p&&l<n});for(;w();){var x=e.charAt(f),v=k.charAt(l),r=g.translation[x];if(r)v.match(r.pattern)?(b[t](v),r.recursive&&(-1===u?u=f:f===s&&(f=u-m),s===u&&(f-=m)),f+=m):r.optional?(f+=m,l-=m):r.fallback?(b[t](r.fallback),f+=m,l-=m):c.invalid.push({p:l,v:v,e:r.pattern}),l+=m;else{if(!a)b[t](x);v===x&&(l+=m);f+=m}}a=e.charAt(s);p!==n+1||g.translation[a]||b.push(a);return b.join("")},callbacks:function(a){var g=
c.val(),n=g!==k,f=[g,a,b,d],p=function(a,b,c){"function"===typeof d[a]&&b&&d[a].apply(this,c)};p("onChange",!0===n,f);p("onKeyPress",!0===n,f);p("onComplete",g.length===e.length,f);p("onInvalid",0<c.invalid.length,[g,a,b,c.invalid,d])}};g.mask=e;g.options=d;g.remove=function(){var a=c.getCaret();c.destroyEvents();c.val(g.getCleanVal());c.setCaret(a-c.getMCharsBeforeCount(a));return b};g.getCleanVal=function(){return c.getMasked(!0)};g.init=function(e){e=e||!1;d=d||{};g.byPassKeys=a.jMaskGlobals.byPassKeys;
g.translation=a.jMaskGlobals.translation;g.translation=a.extend({},g.translation,d.translation);g=a.extend(!0,{},g,d);n=c.getRegexMask();!1===e?(d.placeholder&&b.attr("placeholder",d.placeholder),b.attr("autocomplete","off"),c.destroyEvents(),c.events(),e=c.getCaret(),c.val(c.getMasked()),c.setCaret(e+c.getMCharsBeforeCount(e,!0))):(c.events(),c.val(c.getMasked()))};g.init(!b.is("input"))};a.maskWatchers={};var A=function(){var b=a(this),e={},d=b.attr("data-mask");b.attr("data-mask-reverse")&&(e.reverse=
!0);b.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);if(z(b,d,e))return b.data("mask",new y(this,d,e))},z=function(b,e,d){d=d||{};b=a(b).data("mask");var g=JSON.stringify;try{return"object"!==typeof b||g(b.options)!==g(d)||b.mask!==e}catch(k){}};a.fn.mask=function(b,e){e=e||{};var d=this.selector,g=a.jMaskGlobals,k=a.jMaskGlobals.watchInterval,n=function(){if(z(this,b,e))return a(this).data("mask",new y(this,b,e))};a(this).each(n);d&&""!==d&&g.watchInputs&&(clearInterval(a.maskWatchers[d]),
a.maskWatchers[d]=setInterval(function(){a(document).find(d).each(n)},k))};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){a(this).data("mask")&&a(this).data("mask").remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};var k={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,watchDataMask:!1,byPassKeys:[9,16,17,18,36,
37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};k=a.jMaskGlobals=a.extend(!0,{},k,a.jMaskGlobals);k.dataMask&&a(k.dataMaskAttr).each(A);setInterval(function(){a.jMaskGlobals.watchDataMask&&a(document).find(a.jMaskGlobals.maskElements).filter(k.dataMaskAttr).each(A)},k.watchInterval)});