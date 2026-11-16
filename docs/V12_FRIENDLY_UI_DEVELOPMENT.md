# V12 Friendly UI — development plan

This branch is for a **native C++/LVGL EdgeTX UI redesign** for HelloRadioSky V12/V12 Max. No standalone Lua interface or extra launch button.

## Safety and scope

- Keep `main` as an upstream reference. Make UI changes only on `v12-friendly-ui-dev`.
- Build and test in simulation before flashing anything.
- Preserve mixers, RF, telemetry, warnings, model data, and access to existing advanced settings.
- Do not assume the simulator verifies physical RGB switches, RF modules, or telemetry.

## Verified in repository (2026-11-16)

- V12 firmware preset: `cmake --preset v12` in `CMakePresets.json`, with `PCB=V12`.
- Radio target: `radio/src/targets/hrs/v12/CMakeLists.txt`.
- Target uses the native colour LCD UI (`GUI_DIR colorlcd`), 320x240 graphics, STM32H750 and UF2 packaging.
- RGB customizable switches enabled by `FUNCTION_SWITCHES_WITH_RGB YES`.
- Main-view implementation: `radio/src/gui/colorlcd/mainview/view_main.cpp`.
- Main-view UI components: `radio/src/gui/colorlcd/mainview/`.
- Existing GitHub workflow `.github/workflows/build_fw.yml` includes V12 in its test matrix.

## Milestones

1. **Baseline**: determine exact native simulator build/config for V12, build unchanged upstream tree, capture screenshot and check navigation.
2. **Home screen**: create readable dark FPV dashboard showing model, TX battery, quad voltage, LQ, timer, GPS, flight mode, and arm status when telemetry supports these values.
3. **Navigation**: map existing hardware controls to simple sections; preserve native advanced-settings escape path and alerts.
4. **ELRS UI**: investigate native ExpressLRS device parameter protocol before designing editable packet-rate/power presets; don't assume protocol capabilities.
5. **Hardware readiness**: compare official board capabilities to the working manufacturer firmware, back up models/settings, test recovery before custom flash.

No firmware release should be treated as flash-ready until simulator and build checks pass and the physical V12 Max hardware features have been validated.
