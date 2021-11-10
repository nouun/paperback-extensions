import {
  NavigationButton,
  SourceStateManager,
} from "paperback-extensions-common";
import { CKLanguages } from "./ComicKHelper";

export type StateData = {
  filter: {
    languages: string[],
  }
}

type SettingsValues = {
  filterLangs: string[],
}

export const getStateData =
  async (stateManager: SourceStateManager): Promise<StateData> => {
    const filterLanguages = (await stateManager.retrieve("filterLangs") as string[])
      ?? CKLanguages.getDefault();

    return { filter: { languages: filterLanguages } };
  };

const sectionFilter = (stateManager: SourceStateManager) => createSection({
  id: "filter_section",
  header: "Filters",
  rows: () =>
    getStateData(stateManager).then(async (values: StateData) => [
      createSelect({
        id: "filterLangs",
        label: "Languages",
        options: CKLanguages.getCKCodeList(),
        displayLabel: (option) => CKLanguages.getName(option),
        value: values.filter.languages,
        allowsMultiselect: true,
        minimumOptionCount: 1,
      }),
    ]),
});

const formGeneralSettings = (stateManager: SourceStateManager) => createForm({
  onSubmit: (data: SettingsValues) =>
    Promise.all(
      Object.keys(data).map((key) => stateManager.store(key, data[key])),
    ).then(),
  validate: () => Promise.resolve(true),
  sections: () => Promise.resolve([ sectionFilter(stateManager) ]),
});

export const menuGeneralSettings =
  (stateManager: SourceStateManager): NavigationButton =>
    createNavigationButton({
      id: "filter_settings",
      value: "",
      label: "General Settings",
      form: formGeneralSettings(stateManager),
    });

