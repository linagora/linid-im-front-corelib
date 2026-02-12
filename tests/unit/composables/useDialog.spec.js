import { mount } from '@vue/test-utils';
import { useDialog } from 'src/composables/useDialog';
import { uiEventSubject } from 'src/services/uiEventService';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';

describe('Test composable: useDialog', () => {
  let wrapper;

  const createTestComponent = (onOpen) =>
    defineComponent({
      setup() {
        const { show } = useDialog(onOpen);
        return { show };
      },
      template: '<div>{{ show }}</div>',
    });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('should set show to true when receiving an open event', async () => {
    wrapper = mount(createTestComponent());
    expect(wrapper.vm.show).toBe(false);

    uiEventSubject.next({
      key: 'dialog',
      data: {
        type: 'open',
        uiNamespace: 'test',
        i18nScope: 'test.dialog',
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(true);
  });

  it('should set show to false when receiving a close event', async () => {
    wrapper = mount(createTestComponent());

    // Open first
    uiEventSubject.next({
      key: 'dialog',
      data: {
        type: 'open',
        uiNamespace: 'test',
        i18nScope: 'test.dialog',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(true);

    // Then close
    uiEventSubject.next({
      key: 'dialog',
      data: {
        type: 'close',
        uiNamespace: 'test',
        i18nScope: 'test.dialog',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(false);
  });

  it('should ignore events with different keys', async () => {
    wrapper = mount(createTestComponent());
    expect(wrapper.vm.show).toBe(false);

    uiEventSubject.next({
      key: 'other-event',
      data: {
        type: 'open',
        uiNamespace: 'test',
        i18nScope: 'test.dialog',
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(false);
  });

  it('should call onOpen callback when dialog opens', async () => {
    const onOpenMock = vi.fn();
    wrapper = mount(createTestComponent(onOpenMock));

    const eventData = {
      type: 'open',
      title: 'Test Dialog',
      content: 'Content',
      uiNamespace: 'test',
      i18nScope: 'test.dialog',
    };

    uiEventSubject.next({
      key: 'dialog',
      data: eventData,
    });

    await wrapper.vm.$nextTick();
    expect(onOpenMock).toHaveBeenCalledWith(eventData);
    expect(onOpenMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onOpen callback when dialog closes', async () => {
    const onOpenMock = vi.fn();
    wrapper = mount(createTestComponent(onOpenMock));

    uiEventSubject.next({
      key: 'dialog',
      data: {
        type: 'close',
        uiNamespace: 'test',
        i18nScope: 'test.dialog',
      },
    });

    await wrapper.vm.$nextTick();
    expect(onOpenMock).not.toHaveBeenCalled();
  });

  it('should handle multiple open/close cycles', async () => {
    wrapper = mount(createTestComponent());

    for (let i = 0; i < 3; i++) {
      uiEventSubject.next({
        key: 'dialog',
        data: {
          type: 'open',
          uiNamespace: 'test',
          i18nScope: 'test.dialog',
        },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.show).toBe(true);

      uiEventSubject.next({
        key: 'dialog',
        data: {
          type: 'close',
          uiNamespace: 'test',
          i18nScope: 'test.dialog',
        },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.show).toBe(false);
    }
  });

  it('should unsubscribe when component is unmounted', async () => {
    wrapper = mount(createTestComponent());
    const subscriberCountBefore = uiEventSubject.observers.length;

    wrapper.unmount();

    const subscriberCountAfter = uiEventSubject.observers.length;
    expect(subscriberCountAfter).toBeLessThan(subscriberCountBefore);
  });
});
