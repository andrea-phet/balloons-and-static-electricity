// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
require( [
  'SCENERY/nodes/Text',
  'SCENERY/nodes/Rectangle',
  'Strings',
  'JOIST/Sim',
  'model/BalloonsAndStaticElectricityModel',
  'view/BalloonsAndStaticElectricityView',
  'JOIST/SimLauncher',
  'balloons-and-static-electricity-images'
], function( Text, Rectangle, Strings, Sim, BalloonsAndStaticElectricityModel, BalloonsAndStaticElectricityView, SimLauncher, balloonsAndStaticElectricityImages ) {
  'use strict';

  SimLauncher.launch( balloonsAndStaticElectricityImages, function() {

    var simOptions = {
      credits: 'PhET Development Team -\n' +
               'Lead Design: Noah Podolefsky & Sam Reid\n' +
               'Software Development: Mobile Learner Labs & Sam Reid\n' +
               'Design: Ariel Paul, Kathy Perkins, Trish Loeblein, Sharon Simon-Tov\n' +
               'Interviews: Ariel Paul, Wendy Adams\n',
      thanks: 'Thanks -\n' +
              'Thanks to Mobile Learner Labs for their work in converting this simulation into HTML5.'
    };

    //Create and start the sim
    new Sim( Strings['balloons.name'], [
      {
        name: Strings['balloons.name'],
        icon: new Rectangle( 0, 0, 50, 50, {fill: 'blue'} ),
        createModel: function() {return new BalloonsAndStaticElectricityModel( 768, 504 );},
        createView: function( model ) {return new BalloonsAndStaticElectricityView( model );},
        backgroundColor: "#9ddcf8"
      }
    ], simOptions ).start();
  } );
} );