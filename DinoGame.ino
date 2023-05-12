#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7735.h> // Hardware-specific library for ST7735
#include <SPI.h>

#define TFT_CS        D1 // PyBadge/PyGamer display control pins: chip select
#define TFT_RST       D0 // Display reset
#define TFT_DC        D2 // Display data/command select
#define TFT_BACKLIGHT D3 // Display backlight pin

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_RST);

float p = 3.1415926;

void setup(void) {
  tft.drawLine(0,0,10,10,0xFFFF); // white line  
}

void loop() {

}
