// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var Screen = require( 'JOIST/Screen' );
  var BalloonsAndStaticElectricityModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/model/BalloonsAndStaticElectricityModel' );
  var BalloonsAndStaticElectricityView = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity/view/BalloonsAndStaticElectricityView' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var balloonsAndStaticElectricityTitleString = require( 'string!BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity.title' );

  SimLauncher.launch( function() {

    var simOptions = {
      credits: {
        leadDesign: 'Noah Podolefsky & Sam Reid',
        softwareDevelopment: 'Sam Reid',
        team: 'Wendy Adams, Ariel Paul, Kathy Perkins, Trish Loeblein',
        graphicArts: 'Sharon Siman-Tov',
        thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
      }
    };

    //Create and start the sim
    new Sim( balloonsAndStaticElectricityTitleString, [
      new Screen( balloonsAndStaticElectricityTitleString, null /* no icon, single-screen sim */,
        function() {return new BalloonsAndStaticElectricityModel( 768, 504 );},
        function( model ) {return new BalloonsAndStaticElectricityView( model );},
        { backgroundColor: '#9ddcf8' }
      )
    ], simOptions ).start();
  } );
} );