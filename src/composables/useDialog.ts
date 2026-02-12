/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted, ref } from 'vue';
import { uiEventSubject } from '../services/uiEventService';
import { type DialogEvent } from '../types/dialogType';
import type { UiEvent } from '../types/uiEvent';

/**
 * Composable to manage the state of a dialog based on events emitted by the DialogSubject.
 * @param key - The key to filter dialog events, allowing multiple dialogs to be managed independently.
 * @param onOpen - Optional callback function to execute when the dialog is opened, receiving the dialog event as an argument.
 * @returns An object containing the reactive `show` property to control the dialog visibility.
 */
export function useDialog<T extends DialogEvent>(
  key: string,
  onOpen?: (event: T) => void
) {
  const show = ref<boolean>(false);
  let dialogSubscription: Subscription;
  /**
   * Handles dialog events emitted by the DialogSubject.
   * @param event - The dialog event to process.
   */
  function onDialogEvent(event: UiEvent) {
    if (event.key !== key) {
      return;
    }

    const dialogEvent = event.data as T;

    if (dialogEvent.type === 'close') {
      show.value = false;
      return;
    }

    show.value = true;

    onOpen?.(dialogEvent);
  }

  onMounted(() => {
    dialogSubscription = uiEventSubject.subscribe(onDialogEvent);
  });

  onUnmounted(() => {
    dialogSubscription?.unsubscribe();
  });

  return { show };
}
