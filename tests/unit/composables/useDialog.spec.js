import { mount } from '@vue/test-utils';
import { useDialog } from 'src/composables/useDialog';
import { uiEventSubject } from 'src/services/uiEventService';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';

const { mockUnset, mockDraggable, mockInteract } = vi.hoisted(() => {
  const mockUnset = vi.fn();
  const mockDraggable = vi.fn().mockReturnValue({ unset: mockUnset });
  const mockInteract = vi.fn().mockReturnValue({ draggable: mockDraggable });
  mockInteract.modifiers = { restrictRect: vi.fn().mockReturnValue({}) };
  return { mockUnset, mockDraggable, mockInteract };
});

vi.mock('interactjs', () => ({
  default: mockInteract,
}));

describe('Test composable: useDialog', () => {
  let wrapper;

  const createTestComponent = (onOpen) =>
    // eslint-disable-next-line vue/one-component-per-file
    defineComponent({
      setup() {
        const { show, dialogRef } = useDialog('dialog', onOpen);
        return { show, dialogRef };
      },
      template: '<div>{{ show }}</div>',
    });

  const createDraggableTestComponent = () =>
    // eslint-disable-next-line vue/one-component-per-file
    defineComponent({
      components: {
        ChildComponent: { template: '<div class="drag-handle"></div>' },
      },
      setup() {
        const { show, dialogRef } = useDialog('test-dialog');
        return { show, dialogRef };
      },
      template: '<ChildComponent ref="dialogRef" />',
    });

  // Component without a template ref so tests can control dialogRef directly
  // without Vue re-applying the template ref on re-render.
  const createDialogRefTestComponent = () =>
    // eslint-disable-next-line vue/one-component-per-file
    defineComponent({
      setup() {
        const { show, dialogRef } = useDialog('test-dialog');
        return { show, dialogRef };
      },
      template: '<div></div>',
    });

  beforeEach(() => {
    vi.clearAllMocks();
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

  it('should not call onOpen callback when event key does not match', async () => {
    const onOpenMock = vi.fn();
    wrapper = mount(createTestComponent(onOpenMock));

    uiEventSubject.next({
      key: 'other-dialog',
      data: {
        type: 'open',
        uiNamespace: 'test',
        i18nScope: 'test.dialog',
      },
    });

    await wrapper.vm.$nextTick();
    expect(onOpenMock).not.toHaveBeenCalled();
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
    let capturedSubscription;
    const originalSubscribe = uiEventSubject.subscribe.bind(uiEventSubject);
    vi.spyOn(uiEventSubject, 'subscribe').mockImplementationOnce((observer) => {
      capturedSubscription = originalSubscribe({ next: observer });
      return capturedSubscription;
    });

    wrapper = mount(createTestComponent());
    const unsubscribeSpy = vi.spyOn(capturedSubscription, 'unsubscribe');

    wrapper.unmount();
    wrapper = null;

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should expose dialogRef initially set to null', async () => {
    wrapper = mount(createTestComponent());
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dialogRef).toBeNull();
  });

  it('should initialize interact.js draggable when dialogRef.$el becomes available', async () => {
    wrapper = mount(createDraggableTestComponent());
    await wrapper.vm.$nextTick();

    expect(mockInteract).toHaveBeenCalled();
    expect(mockDraggable).toHaveBeenCalledWith(
      expect.objectContaining({ allowFrom: '.drag-handle' })
    );
  });

  it('should cleanup previous interact.js instance and re-initialize when dialogRef changes', async () => {
    wrapper = mount(createDialogRefTestComponent());

    const target1 = globalThis.document.createElement('div');
    wrapper.vm.dialogRef = { $el: target1 };
    await wrapper.vm.$nextTick();

    expect(mockUnset).not.toHaveBeenCalled();
    expect(mockInteract).toHaveBeenCalledTimes(1);

    const target2 = globalThis.document.createElement('div');
    wrapper.vm.dialogRef = { $el: target2 };
    await wrapper.vm.$nextTick();

    expect(mockUnset).toHaveBeenCalledTimes(1);
    expect(mockInteract).toHaveBeenCalledTimes(2);
  });

  it('should cleanup interact.js without re-initializing when dialogRef becomes null', async () => {
    wrapper = mount(createDialogRefTestComponent());

    const target = globalThis.document.createElement('div');
    wrapper.vm.dialogRef = { $el: target };
    await wrapper.vm.$nextTick();

    expect(mockInteract).toHaveBeenCalledTimes(1);

    wrapper.vm.dialogRef = null;
    await wrapper.vm.$nextTick();

    expect(mockUnset).toHaveBeenCalledTimes(1);
    expect(mockInteract).toHaveBeenCalledTimes(1);
  });

  it('should call interactable.unset when component is unmounted', async () => {
    wrapper = mount(createDraggableTestComponent());
    await wrapper.vm.$nextTick();

    wrapper.unmount();

    expect(mockUnset).toHaveBeenCalled();
  });

  it('should translate the target element on drag move using existing data-x/data-y attributes', async () => {
    wrapper = mount(createDraggableTestComponent());
    await wrapper.vm.$nextTick();

    const { listeners } = mockDraggable.mock.calls[0][0];

    const target = wrapper.vm.dialogRef.$el;
    target.setAttribute('data-x', '10');
    target.setAttribute('data-y', '20');

    listeners.move({ target, dx: 5, dy: -3 });

    expect(target.style.transform).toBe('translate(15px, 17px)');
    expect(target.getAttribute('data-x')).toBe('15');
    expect(target.getAttribute('data-y')).toBe('17');
  });

  it('should translate the target element on drag move when data-x/data-y attributes are absent', async () => {
    wrapper = mount(createDraggableTestComponent());
    await wrapper.vm.$nextTick();

    const { listeners } = mockDraggable.mock.calls[0][0];

    const target = wrapper.vm.dialogRef.$el;

    listeners.move({ target, dx: 7, dy: 3 });

    expect(target.style.transform).toBe('translate(7px, 3px)');
    expect(target.getAttribute('data-x')).toBe('7');
    expect(target.getAttribute('data-y')).toBe('3');
  });

  it('should do nothing on drag move when event target is neither an HTMLElement nor an SVGElement', async () => {
    wrapper = mount(createDraggableTestComponent());
    await wrapper.vm.$nextTick();

    const { listeners } = mockDraggable.mock.calls[0][0];
    const nonElement = {};

    listeners.move({ target: nonElement, dx: 5, dy: 3 });

    expect(nonElement).toEqual({});
  });
});
