import { Box, Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/layout/Headers/Header/Header";
import { CustomPreferences } from "../../../components/logic/Preferences/CustomPreferences/CustomPreferences";
import {
  CustomPreference,
  Preference,
} from "../../../components/logic/Preferences/Preference/Preference";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../../components/ui/customStyledComponents";
import { useSetPreferences } from "../../../fullStore/combos/profile/profileQueries";
import { setIsFirstTimeToFalse } from "../../../fullStore/combos/profile/profilesSlice";
import { selectId } from "../../../fullStore/combos/user/userSlice";
import { useAppSelector } from "../../../fullStore/hooks";
import { RootState } from "../../../fullStore/rootStore";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import styles from "./PreferencesPageStyle";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

const preferences = [
  { text: "sport", isSelected: false },
  { text: "food", isSelected: false },
  { text: "comedy", isSelected: false },
  { text: "minecraft", isSelected: false },
  { text: "programming", isSelected: false },
  { text: "basketball", isSelected: false },
  { text: "England", isSelected: false },
  { text: "USSR", isSelected: false },
];

const PreferencesPage: FC<{}> = () => {

  const {t} = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, [])

  const id = useAppSelector((state: RootState) => selectId(state));
  const dispatch = useCustomDispatch();

  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [defaultPreferences, setDefaultPreferences] = useState(preferences);
  const [customPreferences, setCustomPreferences] = useState([]);

  const addCustomPref = (preferenceText: string) => {
    let trimedPreferenceText = preferenceText.trim();
    if (trimedPreferenceText[0] === "#")
      trimedPreferenceText = trimedPreferenceText.slice(1);
    if (trimedPreferenceText === "") return;

    let found = false;
    defaultPreferences.forEach((defpref, index) => {
      if (defpref.text === trimedPreferenceText) {
        found = true;
        const copyOfDefaultPreferences = [...defaultPreferences];
        copyOfDefaultPreferences[index] = {
          ...copyOfDefaultPreferences[index],
          isSelected: true,
        };
        setDefaultPreferences((prev) => (prev = copyOfDefaultPreferences));
      }
    });
    if (!found) {
      if (customPreferences.length) {
        setCustomPreferences(
          (prev) => (prev = [trimedPreferenceText, ...prev]),
        );
      } else {
        setCustomPreferences((prev) => (prev = [trimedPreferenceText]));
      }
    }
    if (selectedPreferences.length) {
      setSelectedPreferences(
        (prev) => (prev = [trimedPreferenceText, ...prev]),
      );
    } else {
      setSelectedPreferences((prev) => (prev = [trimedPreferenceText]));
    }
  };

  const removeCustomPref = (preferenceText: string) => {
    let trimedPreferenceText = preferenceText.trim();
    if (trimedPreferenceText[0] === "#")
      trimedPreferenceText = trimedPreferenceText.slice(1);
    if (trimedPreferenceText === "") return;

    customPreferences.forEach((custompref, index) => {
      if (custompref === trimedPreferenceText) {
        const copyOfCustomPreferences = [...customPreferences];
        copyOfCustomPreferences.splice(index, 1);
        return setCustomPreferences((prev) => (prev = copyOfCustomPreferences));
      }
    });
    selectedPreferences.forEach((selectedpref, index) => {
      if (selectedpref === trimedPreferenceText) {
        const copyOfSelectedPreferences = [...selectedPreferences];
        copyOfSelectedPreferences.splice(index, 1);
        return setSelectedPreferences(
          (prev) => (prev = copyOfSelectedPreferences),
        );
      }
    });
  };

  const selectPref = (preference: string) => {
    defaultPreferences.forEach((defpref, index) => {
      if (defpref.text === preference) {
        const copyOfDefaultPreferences = [...defaultPreferences];
        copyOfDefaultPreferences.splice(index, 1, {
          text: defpref.text,
          isSelected: true,
        });
        setDefaultPreferences((prev) => (prev = copyOfDefaultPreferences));
      }
    });
    if (selectedPreferences.length) {
      setSelectedPreferences((prev) => (prev = [preference, ...prev]));
    } else {
      setSelectedPreferences((prev) => (prev = [preference]));
    }
  };

  const unSelectPref = (preference: string) => {
    defaultPreferences.forEach((defpref, index) => {
      if (defpref.text === preference) {
        const copyOfDefaultPreferences = [...defaultPreferences];
        copyOfDefaultPreferences.splice(index, 1, {
          text: defpref.text,
          isSelected: false,
        });
        setDefaultPreferences((prev) => (prev = copyOfDefaultPreferences));
      }
    });
    selectedPreferences.forEach((selectedpref, index) => {
      if (selectedpref === preference) {
        const copyOfSelectedPreferences = [...selectedPreferences];
        copyOfSelectedPreferences.splice(index, 1);
        return setSelectedPreferences(
          (prev) => (prev = copyOfSelectedPreferences),
        );
      }
    });
  };

  const navigate = useNavigate();
  const [setPreferences] = useSetPreferences();

  const nextButtonHanlder = () => {
    const preferencesInServerType = selectedPreferences.map((pref: string) => {
      return {
        name: pref,
        rating: 0,
      };
    });
    if (preferencesInServerType.length) {
      setPreferences({
        preferences: preferencesInServerType,
        isFirstTime: true,
      })
        .unwrap()
        .then(() => {
          dispatch(
            setIsFirstTimeToFalse({
              ownId: id,
            }),
          );
          navigate("/");
        });
    }
  };

  return (
    <Box
      sx={styles.container}
    >
      <SmallGoldenRatioBox>
        <CustomStack
          sx={styles.stack}
        >
          <Header text={t("preferences_title")} />
          <Box sx={styles.preferences}>
            {customPreferences.map((preference) => (
              <CustomPreference
                key={preference}
                text={preference}
                removeCustomPref={removeCustomPref}
              />
            ))}
            {defaultPreferences.map((preference) => (
              <Preference
                key={preference.text}
                text={preference.text}
                isSelected={preference.isSelected}
                selectPref={selectPref}
                unSelectPref={unSelectPref}
              />
            ))}
          </Box>
          <CustomPreferences addCustomPref={addCustomPref} />
          <Button
            disabled={!selectedPreferences.length}
            onClick={nextButtonHanlder}
          >
            {t("preferences_button")}
          </Button>
        </CustomStack>
      </SmallGoldenRatioBox>
    </Box>
  );
};

export type addCustomPrefType = (preferenceText: string) => void;

export default PreferencesPage;