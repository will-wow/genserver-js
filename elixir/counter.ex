defmodule Counter do
  use GenServer

  # Client
  def start_link(opts) do
    GenServer.start_link(__MODULE__, [max: opts[:max]], opts)
  end

  def increment(pid) do
    GenServer.call(pid, :increment)
  end

  def get(pid) do
    GenServer.call(pid, :get)
  end

  def reset(pid) do
    GenServer.cast(pid, :reset)
  end

  # Server
  def init(args) do
    max = args[:max] || 10
    %{counter: 0, max: max}
  end

  def handle_call(:increment, _from, %{counter: counter, max: max}) do
    new_counter = counter + 1

    if new_counter <= max do
      {:ok, new_counter, %{counter: new_counter}}
    else
      {:error, :counter_at_max}
    end
  end

  def handle_call(:get, _from, %{counter: counter, max: max}) do
    {:ok, counter, counter}
  end

  def handle_cast(:reset, _from, state) do
    {:ok, %{state | counter: 0}}
  end
end
