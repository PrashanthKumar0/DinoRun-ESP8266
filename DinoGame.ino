#include <Adafruit_GFX.h>     // Core graphics library
#include <Adafruit_ST7735.h>  // Hardware-specific library for ST7735
#include <SPI.h>

#define TFT_CS D1   // PyBadge/PyGamer display control pins: chip select
#define TFT_RST D0  // Display reset
#define TFT_DC D2   // Display data/command select

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_RST);

constexpr float pi = 3.1415926;

/*------------------------------
||      GLOBAL  DECLARATIONS  ||
-------------------------------*/

const uint8_t buffer[]={
  0b00110000,
  0b11110000,
  0b00110010,
  0b00110000,
  0b00110000,
  0b00110000,
  0b11111111,
  0b11111111, 
};

void setup(void) {
  tft.initR(INITR_BLACKTAB);
  tft.setRotation(1);
  clear(); 
  tft.drawBitmap(0, 0, (uint8_t*)buffer, 8, 8,0xFFFF);
}

void loop() {
}
void clear() {
  tft.fillScreen(0);
}